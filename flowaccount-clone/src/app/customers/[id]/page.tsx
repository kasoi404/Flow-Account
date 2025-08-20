import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { Nav } from '@/components/Nav';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
  const customer = await prisma.customer.findFirst({ where: { id: params.id, userId } });
  if (!customer) return null;

  return (
    <main className="space-y-6">
      <Nav />
      <h1 className="text-2xl font-semibold">{customer.name}</h1>
      <div className="card p-6 space-y-2">
        <div>Email: {customer.email || '-'}</div>
        <div>Phone: {customer.phone || '-'}</div>
        <div>Address: {customer.address || '-'}</div>
        <div>Tax ID: {customer.taxId || '-'}</div>
      </div>
    </main>
  );
}

