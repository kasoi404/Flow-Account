import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Nav } from '@/components/Nav';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default async function CustomersPage() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
  const customers = await prisma.customer.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });

  return (
    <main className="space-y-6">
      <Nav />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Link href="/customers/new" className="btn-primary">New Customer</Link>
      </div>
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-white/10">
                <td className="p-3"><Link className="underline" href={`/customers/${c.id}`}>{c.name}</Link></td>
                <td className="p-3">{c.email || '-'}</td>
                <td className="p-3">{c.phone || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

