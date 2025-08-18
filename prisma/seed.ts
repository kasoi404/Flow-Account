@@ .. @@
 import { PrismaClient } from '@prisma/client';
-const p = new PrismaClient();
-async function main(){ await p.user.create({ data:{ email:'demo@flowlite.app' } }); console.log('seed ok'); }
-main().finally(()=>p.$disconnect());
+
+const prisma = new PrismaClient();
+
+async function main() {
+  console.log('🌱 Starting seed...');
+
+  // Create demo users
+  const users = [
+    { email: 'demo@flowlite.app', name: 'Demo User' },
+    { email: 'admin@flowlite.app', name: 'Admin User' },
+    { email: 'test@flowlite.app', name: 'Test User' },
+  ];
+
+  for (const userData of users) {
+    const user = await prisma.user.upsert({
+      where: { email: userData.email },
+      update: {},
+      create: userData,
+    });
+    console.log(`✅ Created user: ${user.email}`);
+  }
+
+  console.log('🎉 Seed completed successfully!');
+}
+
+main()
+  .catch((e) => {
+    console.error('❌ Seed failed:', e);
+    process.exit(1);
+  })
+  .finally(async () => {
+    await prisma.$disconnect();
+  });