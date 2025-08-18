@@ .. @@
+import { Suspense } from 'react';
+import { UserList } from '@/components/UserList';
+import { CreateUserForm } from '@/components/CreateUserForm';
+
 export default function Home(){
   return (
   )
 }
-    <main style={{padding:16}}>
-      <h1>FlowLite</h1>
-      <p>Minimal bootstrap ready.</p>
+    <main className="container mx-auto px-4 py-8 max-w-4xl">
+      <div className="text-center mb-12">
+        <h1 className="text-4xl font-bold text-gray-900 mb-4">
+          FlowLite
+        </h1>
+        <p className="text-lg text-gray-600 mb-8">
+          A minimal, production-ready Next.js application with modern tooling
+        </p>
+        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
+          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Next.js 14</span>
+          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">TypeScript</span>
+          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Prisma</span>
+          <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">Tailwind CSS</span>
+        </div>
+      </div>
+
+      <div className="grid gap-8 md:grid-cols-2">
+        <div className="card p-6">
+          <h2 className="text-xl font-semibold mb-4">Create New User</h2>
+          <CreateUserForm />
+        </div>
+        
+        <div className="card p-6">
+          <h2 className="text-xl font-semibold mb-4">Users</h2>
+          <Suspense fallback={<div className="text-gray-500">Loading users...</div>}>
+            <UserList />
+          </Suspense>
+        </div>
+      </div>
+
+      <div className="mt-12 text-center">
+        <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
+        <div className="grid gap-4 md:grid-cols-3 text-sm">
+          <div className="card p-4">
+            <h4 className="font-medium mb-2">1. Database</h4>
+            <code className="text-xs bg-gray-100 p-1 rounded">npm run db:dev</code>
+          </div>
+          <div className="card p-4">
+            <h4 className="font-medium mb-2">2. Seed Data</h4>
+            <code className="text-xs bg-gray-100 p-1 rounded">npm run db:seed</code>
+          </div>
+          <div className="card p-4">
+            <h4 className="font-medium mb-2">3. Development</h4>
+            <code className="text-xs bg-gray-100 p-1 rounded">npm run dev</code>
+          </div>
+        </div>
+      </div>
     </main>
   );
 }