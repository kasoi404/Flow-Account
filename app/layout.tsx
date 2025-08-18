import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FlowLite',
    template: '%s | FlowLite'
  },
  description: 'A minimal, production-ready Next.js application with modern tooling',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma'],
  authors: [{ name: 'FlowLite Team' }],
  creator: 'FlowLite',
  publisher: 'FlowLite',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowlite.app',
    title: 'FlowLite',
    description: 'A minimal, production-ready Next.js application',
    siteName: 'FlowLite',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowLite',
    description: 'A minimal, production-ready Next.js application',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50 text-gray-900 antialiased">
        <div className="min-h-full">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">FlowLite</h1>
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    v1.0.0
                  </span>
                </div>
                <nav className="flex space-x-4">
                  <a
                    href="https://github.com/flowlite/flowlite"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href="/docs"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Docs
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-sm text-gray-500">
                <p>&copy; 2024 FlowLite. Built with Next.js, TypeScript, and Tailwind CSS.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}