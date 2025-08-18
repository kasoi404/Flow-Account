import { prisma } from '@/lib/prisma';
import { User } from '@/types';

interface UserListProps {
  limit?: number;
}

export async function UserList({ limit = 10 }: UserListProps) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    if (users.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No users found</h3>
          <p className="text-sm text-gray-500">Get started by creating your first user.</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {users.map((user: User, index: number) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user.name || 'Unnamed User'}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">
                  Created {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="badge badge-secondary">
                Active
              </span>
              <div className="text-xs text-gray-400 font-mono">
                {user.id.slice(0, 8)}...
              </div>
            </div>
          </div>
        ))}
        
        {users.length === limit && (
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Showing {limit} most recent users
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">Failed to load users</h3>
        <p className="text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }
}