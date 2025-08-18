"use client";
import { useState } from 'react';
import { Nav } from '@/src/components/Nav';
import { useRouter } from 'next/navigation';

export default function NewCustomerPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [taxId, setTaxId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, address, taxId })
    });
    if (res.ok) router.push('/customers');
    else setError((await res.json()).error || 'Failed');
  };

  return (
    <main className="space-y-6">
      <Nav />
      <h1 className="text-2xl font-semibold">New Customer</h1>
      <form onSubmit={onSubmit} className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="input md:col-span-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input className="input" placeholder="Tax ID" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
        {error && <p className="text-red-400 md:col-span-2">{error}</p>}
        <div className="md:col-span-2 flex gap-2">
          <button className="btn-secondary" type="button" onClick={() => history.back()}>Cancel</button>
          <button className="btn-primary" type="submit">Save</button>
        </div>
      </form>
    </main>
  );
}

