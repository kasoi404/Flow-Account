import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const bodySchema = z.object({
  name: z.string().min(1),
  unitPrice: z.string().regex(/^\d+(?:\.\d{1,2})?$/),
  description: z.string().optional().or(z.literal('').transform(() => undefined))
});

export async function POST(req: Request) {
  try {
    const token = (await req.headers.get('cookie'))?.split(';').find((c) => c.trim().startsWith('token='))?.split('=')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };

    const data = bodySchema.parse(await req.json());
    const created = await prisma.product.create({ data: { name: data.name, unitPrice: data.unitPrice, description: data.description, userId } as any });
    return NextResponse.json(created);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 400 });
  }
}

