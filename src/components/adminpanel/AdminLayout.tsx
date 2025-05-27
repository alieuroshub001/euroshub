'use client';

import { Briefcase, FileText, Home, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[var(--secondary)]/10">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[var(--card-bg)] border-r border-[var(--secondary)]/20 p-4 fixed">
          <div className="mb-8 p-4">
            <h1 className="text-xl font-bold text-[var(--primary)]">EurosHub Admin</h1>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/jobs"
              className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors"
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Job Postings
            </Link>
            <Link
              href="/admin/applications"
              className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors"
            >
              <FileText className="w-5 h-5 mr-3" />
              Applications
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}