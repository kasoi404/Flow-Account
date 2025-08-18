import Link from 'next/link';

export function Nav() {
  return (
    <nav className="flex items-center justify-between mb-6">
      <Link href="/" className="text-lg font-semibold">FlowAccount</Link>
      <div className="flex gap-3">
        <Link className="btn-secondary" href="/dashboard">Dashboard</Link>
        <Link className="btn-secondary" href="/customers">Customers</Link>
        <Link className="btn-secondary" href="/products">Products</Link>
        <Link className="btn-secondary" href="/invoices">Invoices</Link>
        <form action="/api/auth/logout" method="post">
          <button className="btn-primary" type="submit">Logout</button>
        </form>
      </div>
    </nav>
  );
}

