'use client';

import { Briefcase, Home, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }

    // Check for saved theme preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.body.classList.add('dark');
      setDarkMode(true);
    } else {
      document.body.classList.remove('dark');
      setDarkMode(false);
    }

    // Check for mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[var(--secondary)]/10">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-[var(--card-bg)] border-b border-[var(--secondary)]/20 z-50 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--primary)]">EurosHub Admin</h1>
          <button
            onClick={toggleMobileMenu}
            className="text-[var(--foreground)] p-2 rounded-lg hover:bg-[var(--secondary)]/20"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className={`${isMobile ? 'fixed inset-y-0 left-0 transform' : ''} ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          !isMobile ? 'translate-x-0' : ''
        } w-64 min-h-screen bg-[var(--card-bg)] border-r border-[var(--secondary)]/20 p-4 transition-transform duration-300 ease-in-out z-40 ${
          isMobile ? mobileMenuOpen ? 'block' : 'hidden' : 'block'
        }`}>
          <div className="mb-8 p-4">
            <h1 className="text-xl font-bold text-[var(--primary)]">EurosHub Admin</h1>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors"
              onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/jobs"
              className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors"
              onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Job Postings
            </Link>
          </nav>

          <div className="mt-8 space-y-2">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors w-full"
              aria-label="Toggle Dark Mode"
            >
              <div className="flex items-center">
                {darkMode ? (
                  <Moon className="w-5 h-5 mr-3 text-blue-400" />
                ) : (
                  <Sun className="w-5 h-5 mr-3 text-yellow-500" />
                )}
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div className={`w-6 h-3 rounded-full border flex items-center px-0.5 transition-colors ${
                darkMode ? 'bg-[var(--foreground)]' : 'bg-[var(--secondary)]'
              }`}>
                <div
                  className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                    darkMode
                      ? 'translate-x-3 bg-[var(--background)]'
                      : 'bg-[var(--foreground)]'
                  }`}
                />
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center p-3 rounded-lg hover:bg-[var(--secondary)]/20 text-[var(--foreground)] transition-colors w-full"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-64'} p-8 ${isMobile ? 'mt-16' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}