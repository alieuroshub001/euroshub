'use client';

import { Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ADMIN_CREDENTIALS = {
  username: 'alieuroshub',
  password: 'alirayyan001'
};

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--secondary)] p-4">
      <div className="w-full max-w-md bg-[var(--card-bg)] rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Admin Portal</h1>
          <p className="text-[var(--foreground)]/80 mt-2">Sign in to manage job postings</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[var(--foreground)]/50" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[var(--foreground)]/50" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-lg font-medium hover:bg-[var(--primary)]/90 transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}