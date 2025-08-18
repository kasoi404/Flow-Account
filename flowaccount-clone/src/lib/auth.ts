import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export type JwtPayload = {
  userId: string;
  email: string;
};

export async function registerUser(params: { email: string; password: string; name: string; }) {
  const existing = await prisma.user.findUnique({ where: { email: params.email } });
  if (existing) {
    throw new Error('Email already in use');
  }
  const passwordHash = await bcrypt.hash(params.password, 10);
  const user = await prisma.user.create({ data: { email: params.email, passwordHash, name: params.name } });
  return createToken({ userId: user.id, email: user.email });
}

export async function loginUser(params: { email: string; password: string; }) {
  const user = await prisma.user.findUnique({ where: { email: params.email } });
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(params.password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');
  return createToken({ userId: user.id, email: user.email });
}

export function createToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

