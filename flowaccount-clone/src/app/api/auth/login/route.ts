import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, password } = bodySchema.parse(json);
    const token = await loginUser({ email, password });
    const res = NextResponse.json({ ok: true });
    res.headers.set('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Login failed' }, { status: 400 });
  }
}

