import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPaths = ['/dashboard', '/customers', '/products', '/invoices'];

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const isProtected = authPaths.some((p) => url.pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const hasToken = Boolean(req.cookies.get('token')?.value);
  if (!hasToken) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/customers/:path*', '/products/:path*', '/invoices/:path*']
};

