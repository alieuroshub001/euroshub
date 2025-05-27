'use client';

import { Briefcase, CheckCircle, FileText, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Job } from '@/types/job';

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
        const jobsResponse = await fetch('/api/jobs');
        if (!jobsResponse.ok) throw new Error('Failed to fetch jobs');
        const jobsData = await jobsResponse.json();

        setStats([
          { 
            name: 'Total Jobs', 
            value: jobsData.length, 
            icon: Briefcase, 
            change: '+12%'
          },
          { 
            name: 'Live Jobs', 
            value: jobsData.filter((job: Job) => job.isLive).length, 
            icon: CheckCircle, 
            change: '+5%' 
          }
        ]);

        const recentActivities: ActivityItem[] = jobsData.slice(0, 3).map((job: Job) => ({
          type: job.updatedAt ? 'job_updated' : 'job_created',
          title: `${job.updatedAt ? 'Updated' : 'Posted'} job: ${job.title}`,
          timestamp: new Date(job.updatedAt || job.createdAt || Date.now()),
          icon: Briefcase,
          iconColor: 'purple'
        }));

        setActivities(recentActivities.sort((a, b) => 
          b.timestamp.getTime() - a.timestamp.getTime()
        ).slice(0, 5));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm border border-[var(--secondary)]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--foreground)]/70">{stat.name}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-sm text-green-500 mt-1">{stat.change}</p>
              </div>
              <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                <stat.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm border border-[var(--secondary)]/20">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-[var(--secondary)]/10 rounded-lg transition-colors">
                <div className={`bg-${activity.iconColor}-100 p-2 rounded-full mr-4`}>
                  <activity.icon className={`w-5 h-5 text-${activity.iconColor}-500`} />
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-[var(--foreground)]/70">
                    {timeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[var(--foreground)]/70">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to format time ago
function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
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
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'Just now';
}