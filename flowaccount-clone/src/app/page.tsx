import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">FlowAccount Clone</h1>
        <div className="flex gap-2">
          <Link className="btn-secondary" href="/auth/login">Login</Link>
          <Link className="btn-primary" href="/auth/register">Register</Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard" className="card p-6">
          <h2 className="text-xl font-medium">Dashboard</h2>
          <p className="text-white/60">Overview of invoices, customers, products</p>
        </Link>
        <Link href="/customers" className="card p-6">
          <h2 className="text-xl font-medium">Customers</h2>
          <p className="text-white/60">Manage your customers</p>
        </Link>
        <Link href="/invoices" className="card p-6">
          <h2 className="text-xl font-medium">Invoices</h2>
          <p className="text-white/60">Create and track invoices</p>
        </Link>
      </div>
    </main>
  );
}

