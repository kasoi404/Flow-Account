import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Nav } from '@/components/Nav';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default async function InvoicesPage() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
  const invoices = await prisma.invoice.findMany({ where: { userId }, include: { customer: true }, orderBy: { createdAt: 'desc' } });

  return (
    <main className="space-y-6">
      <Nav />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <Link href="/invoices/new" className="btn-primary">New Invoice</Link>
      </div>
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60">
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-white/10">
                <td className="p-3">{inv.customer.name}</td>
                <td className="p-3">{'$'}{inv.total.toString()}</td>
                <td className="p-3">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

