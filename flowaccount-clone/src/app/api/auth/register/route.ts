import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { name, email, password } = bodySchema.parse(json);
    const token = await registerUser({ name, email, password });
    const res = NextResponse.json({ ok: true });
    res.headers.set('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 400 });
  }
}

