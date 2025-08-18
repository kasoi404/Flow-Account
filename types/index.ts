import type { User } from '@prisma/client';

export type { User };

export interface CreateUserData {
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}