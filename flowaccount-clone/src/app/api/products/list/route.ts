import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function GET(req: Request) {
  try {
    const token = (await req.headers.get('cookie'))?.split(';').find((c) => c.trim().startsWith('token='))?.split('=')[1];
    if (!token) return NextResponse.json([], { status: 200 });
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
    const products = await prisma.product.findMany({ where: { userId }, select: { id: true, name: true, unitPrice: true } });
    const serialized = products.map(p => ({ ...p, unitPrice: p.unitPrice.toString() }));
    return NextResponse.json(serialized);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

