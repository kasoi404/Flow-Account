import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Nav } from '@/components/Nav';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default async function ProductsPage() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
  const products = await prisma.product.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });

  return (
    <main className="space-y-6">
      <Nav />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/products/new" className="btn-primary">New Product</Link>
      </div>
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60">
              <th className="p-3">Name</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{'$'}{p.unitPrice.toString()}</td>
                <td className="p-3 text-white/60">{p.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

