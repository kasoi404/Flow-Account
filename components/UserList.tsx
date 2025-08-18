import { prisma } from '@/lib/prisma';

export async function UserList() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No users found. Create your first user!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium text-gray-900">{user.email}</p>
            <p className="text-sm text-gray-500">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {user.id.slice(0, 8)}...
          </div>
        </div>
      ))}
    </div>
  );
}