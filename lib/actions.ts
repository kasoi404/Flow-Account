'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';
import { CreateUserData } from '@/types';

export async function createUser(data: CreateUserData) {
  try {
    // Validate input
    if (!data.email || typeof data.email !== 'string') {
      throw new Error('Email is required');
    }

    const email = data.email.toLowerCase().trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: data.name?.trim() || null,
      },
    });
    
    // Revalidate the page to show the new user
    revalidatePath('/');
    
    return user;
  } catch (error) {
    console.error('Failed to create user:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to create user. Please try again.');
  }
}

export async function deleteUser(id: string) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('User ID is required');
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to delete user. Please try again.');
  }
}

export async function updateUser(id: string, data: Partial<CreateUserData>) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('User ID is required');
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // If email is being updated, validate it
    if (data.email) {
      const email = data.email.toLowerCase().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check if email is already taken by another user
      const emailTaken = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id },
        },
      });

      if (emailTaken) {
        throw new Error('A user with this email already exists');
      }

      data.email = email;
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(data.email && { email: data.email }),
        ...(data.name !== undefined && { name: data.name?.trim() || null }),
      },
    });

    revalidatePath('/');
    
    return user;
  } catch (error) {
    console.error('Failed to update user:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to update user. Please try again.');
  }
}