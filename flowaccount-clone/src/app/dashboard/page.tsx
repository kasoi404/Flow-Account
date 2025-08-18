import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { Nav } from '@/components/Nav';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };

  const [invoiceCount, customerCount, productCount] = await Promise.all([
    prisma.invoice.count({ where: { userId } }),
    prisma.customer.count({ where: { userId } }),
    prisma.product.count({ where: { userId } })
  ]);

  return (
    <main className="space-y-6">
      <Nav />
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6"><div className="text-white/60">Invoices</div><div className="text-3xl font-bold">{invoiceCount}</div></div>
        <div className="card p-6"><div className="text-white/60">Customers</div><div className="text-3xl font-bold">{customerCount}</div></div>
        <div className="card p-6"><div className="text-white/60">Products</div><div className="text-3xl font-bold">{productCount}</div></div>
      </div>
    </main>
  );
}

