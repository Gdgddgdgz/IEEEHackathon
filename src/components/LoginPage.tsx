import React, { useState } from 'react';


interface LoginProps {
  onLogin: (role: 'teacher' | 'student') => void;
}


export function LoginPage({ onLogin }: LoginProps) {
  const [role, setRole] = useState<'teacher' | 'student' | ''>('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !username.trim()) {
      setError('Please select a role and enter your name.');
      return;
    }
    setError('');
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="rounded-xl shadow-2xl w-full max-w-xs px-6 py-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-700 dark:text-blue-200">Login</h2>
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Role</label>
          <div className="flex gap-2">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg border-2 ${role === 'student' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg border-2 ${role === 'teacher' ? 'border-purple-600 bg-purple-50 dark:bg-purple-900' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}
              onClick={() => setRole('teacher')}
            >
              Teacher
            </button>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
