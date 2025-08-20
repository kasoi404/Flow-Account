"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (res.ok) {
      window.location.href = '/dashboard';
    } else {
      const data = await res.json();
      setError(data.error || 'Registration failed');
    }
  };

  return (
    <main className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-400">{error}</p>}
        <button className="btn-primary" type="submit">Create account</button>
      </form>
      <p className="text-white/60">Have an account? <Link className="underline" href="/auth/login">Login</Link></p>
    </main>
  );
}

