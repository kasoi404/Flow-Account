import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const itemSchema = z.object({
  productId: z.string().optional(),
  description: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.string().regex(/^\d+(?:\.\d{1,2})?$/)
});

const bodySchema = z.object({
  customerId: z.string().min(1),
  issueDate: z.string().min(1),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(itemSchema).min(1)
});

export async function POST(req: Request) {
  try {
    const token = (await req.headers.get('cookie'))?.split(';').find((c) => c.trim().startsWith('token='))?.split('=')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };

    const data = bodySchema.parse(await req.json());
    const subtotal = data.items.reduce((sum, it) => sum + Number(it.unitPrice) * it.quantity, 0);
    const tax = Number((subtotal * 0.07).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    const created = await prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          userId,
          customerId: data.customerId,
          issueDate: new Date(data.issueDate),
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
          notes: data.notes,
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2)
        }
      });
      for (const it of data.items) {
        await tx.invoiceItem.create({
          data: {
            invoiceId: invoice.id,
            productId: it.productId,
            description: it.description,
            quantity: it.quantity,
            unitPrice: it.unitPrice,
            lineTotal: (Number(it.unitPrice) * it.quantity).toFixed(2)
          }
        });
      }
      return invoice;
    });

    return NextResponse.json(created);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 400 });
  }
}