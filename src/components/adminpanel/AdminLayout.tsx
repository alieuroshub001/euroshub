'use client';

import { Briefcase, Home, LogOut, Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) router.push('/admin/login');
    else setIsAuthenticated(true);

    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.body.classList.add('dark');
      setDarkMode(true);
    } else {
      document.body.classList.remove('dark');
      setDarkMode(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[var(--secondary)]/10 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--card-bg)] border-r border-[var(--secondary)]/20 p-4 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:block`}>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[var(--primary)]">EurosHub Admin</h1>
        </div>

        <nav className="space-y-2">
          <NavItem href="/admin/dashboard" icon={<Home className="w-5 h-5 mr-3" />} label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
          <NavItem href="/admin/jobs" icon={<Briefcase className="w-5 h-5 mr-3" />} label="Job Postings" onClick={() => setMobileMenuOpen(false)} />
        </nav>

        <div className="mt-8 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] w-full transition"
            aria-label="Toggle Theme"
          >
            <div className="flex items-center">
              {darkMode ? <Moon className="w-5 h-5 mr-3 text-blue-400" /> : <Sun className="w-5 h-5 mr-3 text-yellow-500" />}
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </div>
            <div className={`w-6 h-3 rounded-full border flex items-center px-0.5 ${darkMode ? 'bg-[var(--foreground)]' : 'bg-[var(--secondary)]'}`}>
              <div
                className={`w-2 h-2 rounded-full transform transition-transform duration-300 ${darkMode ? 'translate-x-3 bg-[var(--background)]' : 'bg-[var(--foreground)]'}`}
              />
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] w-full transition"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--card-bg)] border-b border-[var(--secondary)]/20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[var(--primary)]">EurosHub Admin</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[var(--foreground)] p-2 rounded-lg hover:bg-[var(--secondary)]/20"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Main Content */}
      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${mobileMenuOpen ? 'blur-sm pointer-events-none' : ''} md:ml-64 mt-16 md:mt-0`}>
        {children}
      </main>
    </div>
  );
}

const NavItem = ({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition"
  >
    {icon}
    {label}
  </Link>
);
