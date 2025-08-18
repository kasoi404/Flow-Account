"use client";
import { useEffect, useState } from 'react';
import { Nav } from '@/components/Nav';
import { useRouter } from 'next/navigation';

type Customer = { id: string; name: string };
type Product = { id: string; name: string; unitPrice: string };

type Item = { productId?: string; description: string; quantity: number; unitPrice: string };

export default function NewInvoicePage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [issueDate, setIssueDate] = useState<string>(() => new Date().toISOString().slice(0,10));
  const [dueDate, setDueDate] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<Item[]>([{ description: '', quantity: 1, unitPrice: '' }]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch('/api/customers/list').then(r => r.json()),
      fetch('/api/products/list').then(r => r.json())
    ]).then(([c, p]) => { setCustomers(c); setProducts(p); });
  }, []);

  const addItem = () => setItems((prev) => [...prev, { description: '', quantity: 1, unitPrice: '' }]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const onItemChange = (idx: number, field: keyof Item, value: string) => {
    setItems((prev) => prev.map((it, i) => i === idx ? { ...it, [field]: field === 'quantity' ? Number(value) : value } as Item : it));
  };

  const onProductSelect = (idx: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    setItems((prev) => prev.map((it, i) => i === idx ? { ...it, productId, description: product?.name || it.description, unitPrice: product?.unitPrice || it.unitPrice } : it));
  };

  const subtotal = items.reduce((sum, it) => sum + (Number(it.unitPrice || 0) * Number(it.quantity || 0)), 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, issueDate, dueDate: dueDate || undefined, notes, items })
    });
    if (res.ok) router.push('/invoices');
    else setError((await res.json()).error || 'Failed');
  };

  return (
    <main className="space-y-6">
      <Nav />
      <h1 className="text-2xl font-semibold">New Invoice</h1>
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="input" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
            <option value="">Select customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="input" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required />
          <input className="input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>

        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2">
              <select className="input md:col-span-2" value={it.productId || ''} onChange={(e) => onProductSelect(idx, e.target.value)}>
                <option value="">Select product (optional)</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <input className="input md:col-span-2" placeholder="Description" value={it.description} onChange={(e) => onItemChange(idx, 'description', e.target.value)} />
              <input className="input" type="number" min="1" placeholder="Qty" value={it.quantity} onChange={(e) => onItemChange(idx, 'quantity', e.target.value)} />
              <input className="input" placeholder="Unit price" value={it.unitPrice} onChange={(e) => onItemChange(idx, 'unitPrice', e.target.value)} />
              <div className="md:col-span-6 flex justify-end gap-2">
                <button type="button" className="btn-secondary" onClick={() => removeItem(idx)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addItem}>Add item</button>
        </div>

        <textarea className="input w-full" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <div className="flex flex-col items-end gap-1">
          <div className="text-white/80">Subtotal: {'$'}{subtotal.toFixed(2)}</div>
          <div className="text-white/80">Tax (7%): {'$'}{tax.toFixed(2)}</div>
          <div className="text-xl font-semibold">Total: {'$'}{total.toFixed(2)}</div>
        </div>

        {error && <p className="text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button className="btn-secondary" type="button" onClick={() => history.back()}>Cancel</button>
          <button className="btn-primary" type="submit">Save invoice</button>
        </div>
      </form>
    </main>
  );
}

