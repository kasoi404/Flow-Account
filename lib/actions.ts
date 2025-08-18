'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';

export async function createUser(email: string) {
  try {
    const user = await prisma.user.create({
      data: { email: email.toLowerCase().trim() },
    });
    
    revalidatePath('/');
    return user;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      throw new Error('A user with this email already exists');
    }
    throw new Error('Failed to create user');
  }
}