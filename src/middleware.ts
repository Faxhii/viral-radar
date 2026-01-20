import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Admin route protection is handled client-side in the admin layout
    // because the JWT token is stored in localStorage, not cookies
    // The layout.tsx checks for token and superuser status
    return NextResponse.next();
}

export const config = {
    matcher: '/admin8289/:path*',
};
