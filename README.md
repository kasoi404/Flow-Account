@@ .. @@
-# FlowLite (Minimal Bootstrap)
-ใช้เป็นจุดเริ่มต้น / มีสคริปต์สร้าง ZIP และ Release อัตโนมัติ
-## Run local
-npm i
-npm run db:dev
-npm run db:seed
-npm run dev
+# FlowLite
+
+A minimal, production-ready Next.js application with modern tooling and best practices.
+
+## Features
+
+- ⚡ **Next.js 14** with App Router
+- 🎨 **Tailwind CSS** for styling
+- 🗄️ **Prisma** with PostgreSQL
+- 📱 **PWA Ready** with manifest
+- 🔧 **TypeScript** for type safety
+- 🧹 **ESLint** for code quality
+- 🚀 **Production optimized**
+
+## Quick Start
+
+1. **Install dependencies**
+   ```bash
+   npm install
+   ```
+
+2. **Set up environment**
+   ```bash
+   cp .env.example .env
+   # Edit .env with your database URL
+   ```
+
+3. **Set up database**
+   ```bash
+   npm run db:dev
+   npm run db:seed
+   ```
+
+4. **Start development server**
+   ```bash
+   npm run dev
+   ```
+
+## Available Scripts
+
+- `npm run dev` - Start development server
+- `npm run build` - Build for production
+- `npm run start` - Start production server
+- `npm run lint` - Run ESLint
+- `npm run type-check` - Run TypeScript compiler
+- `npm run db:dev` - Run database migrations
+- `npm run db:seed` - Seed database with sample data
+- `npm run db:studio` - Open Prisma Studio
+- `npm run db:reset` - Reset database
+- `npm run pack:zip` - Create deployment ZIP
+
+## Project Structure
+
+```
+├── app/                 # Next.js App Router
+├── components/          # React components
+├── lib/                # Utilities and configurations
+├── prisma/             # Database schema and migrations
+├── public/             # Static assets
+├── types/              # TypeScript type definitions
+└── .github/workflows/  # CI/CD workflows
+```
+
+## Database
+
+This project uses Prisma with PostgreSQL. The schema includes:
+
+- **User** model with email, name, and timestamps
+- Automatic migrations and seeding
+- Type-safe database queries
+
+## Deployment
+
+The project includes GitHub Actions workflows for:
+
+- Automated ZIP creation
+- Release management
+- CI/CD pipeline
+
+## Contributing
+
+1. Fork the repository
+2. Create a feature branch
+3. Make your changes
+4. Run tests and linting
+5. Submit a pull request
+
+## License
+
+MIT License - see LICENSE file for details.