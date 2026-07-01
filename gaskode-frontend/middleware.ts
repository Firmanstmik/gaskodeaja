import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookie
  const token = request.cookies.get('gaskode_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');

  // Jika mencoba akses dashboard tapi tidak ada token
  if (!token && request.nextUrl.pathname.startsWith('/branding')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah login tapi mencoba akses halaman login/register lagi
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/branding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Daftar semua rute dari sidebar yang membutuhkan login (Private Routes)
    '/hero/:path*',
    '/categories/:path*',
    '/services/:path*',
    '/service-plans/:path*',
    '/portfolios/:path*',
    '/users/:path*',
    '/posts/:path*',
    '/testimonials/:path*',
    '/leads/:path*',
    '/visi-misi/:path*',
    '/cara-kerja/:path*',
    '/branding/:path*',
    '/qna/:path*',
    '/contacts/:path*',
    '/contact-submission/:path*',
    '/footer/:path*',

    // cegah user yang sudah login tidak bisa masuk ke link ini lagi sebelum logout
    '/login',
    '/register',
  ],
};
