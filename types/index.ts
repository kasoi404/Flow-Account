import type { User as PrismaUser } from '@prisma/client';

export type User = PrismaUser;

export interface CreateUserData {
  email: string;
  name?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserFilters {
  search?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

// Form state types
export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

// Database connection status
export interface DatabaseStatus {
  connected: boolean;
  error?: string;
}

// Application configuration
export interface AppConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  repository: string;
}