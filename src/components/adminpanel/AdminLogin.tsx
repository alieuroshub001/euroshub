'use client';

import { Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';

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
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--secondary)] p-4">
      <div className="w-full max-w-md bg-[var(--card-bg)] rounded-2xl shadow-xl p-8 border border-[var(--secondary)]/30">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--primary)]">Admin Portal</h1>
          <p className="text-sm text-[var(--foreground)]/70 mt-1">
            Sign in to manage job postings
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-100 text-red-700 rounded-lg text-sm animate-pulse border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<User className="w-5 h-5 text-[var(--foreground)]/50" />}
            label="Username"
            placeholder="Enter username"
          />

          <InputField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5 text-[var(--foreground)]/50" />}
            label="Password"
            placeholder="Enter password"
          />

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-2.5 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

const InputField = ({
  id,
  type,
  value,
  onChange,
  icon,
  label,
  placeholder
}: {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  label: string;
  placeholder: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)] mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
      />
    </div>
  </div>
);
