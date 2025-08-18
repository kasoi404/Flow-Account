"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Nav } from '@/src/components/Nav';

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, unitPrice, description })
    });
    if (res.ok) router.push('/products');
    else setError((await res.json()).error || 'Failed');
  };

  return (
    <main className="space-y-6">
      <Nav />
      <h1 className="text-2xl font-semibold">New Product</h1>
      <form onSubmit={onSubmit} className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" required placeholder="Unit price (e.g. 100.00)" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
        <input className="input md:col-span-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {error && <p className="text-red-400 md:col-span-2">{error}</p>}
        <div className="md:col-span-2 flex gap-2">
          <button className="btn-secondary" type="button" onClick={() => history.back()}>Cancel</button>
          <button className="btn-primary" type="submit">Save</button>
        </div>
      </form>
    </main>
  );
}

