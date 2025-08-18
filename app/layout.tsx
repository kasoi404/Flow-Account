import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlowLite',
  description: 'A minimal, production-ready Next.js application',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
          {children}
        </div>
      </body>
    </html>
  );
}