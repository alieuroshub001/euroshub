'use client';

import { Job } from '@/types/job';
import { Briefcase, CheckCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type DashboardStat = {
  name: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
};

type ActivityItem = {
  type: 'job_created' | 'job_updated' | 'application_received';
  title: string;
  timestamp: Date;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const jobs: Job[] = await res.json();

        setStats([
          {
            name: 'Total Jobs',
            value: jobs.length,
            icon: Briefcase,
            change: '+12%'
          },
          {
            name: 'Live Jobs',
            value: jobs.filter((job) => job.isLive).length,
            icon: CheckCircle,
            change: '+5%'
          }
        ]);

        const recent: ActivityItem[] = jobs.slice(0, 5).map((job) => ({
          type: job.updatedAt ? 'job_updated' : 'job_created',
          title: `${job.updatedAt ? 'Updated' : 'Posted'} job: ${job.title}`,
          timestamp: new Date(job.updatedAt || job.createdAt || Date.now()),
          icon: Briefcase,
          iconColor: 'purple'
        }));

        setActivities(
          recent.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        );
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const timeAgo = useMemo(() => (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin h-12 w-12 border-4 border-t-transparent rounded-full border-[var(--primary)]" />
      </div>
    );
  }

  return (
    <section className="space-y-10">
      <h1 className="text-3xl font-bold text-[var(--primary)]">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--secondary)]/20 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-[var(--foreground)]/60">{stat.name}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
            <div className="p-3 rounded-full bg-[var(--primary)]/10">
              <stat.icon className="w-6 h-6 text-[var(--primary)]" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--secondary)]/20">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.length ? (
            activities.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-[var(--secondary)]/10 rounded-lg transition"
              >
                <div className={`p-2 rounded-full bg-purple-100`}>
                  <item.icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-[var(--foreground)]/60">{timeAgo(item.timestamp)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[var(--foreground)]/70 text-sm">No recent activity</p>
          )}
        </div>
      </div>
    </section>
  );
}
