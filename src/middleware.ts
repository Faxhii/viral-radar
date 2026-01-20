import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the route is an admin route
    if (request.nextUrl.pathname.startsWith('/admin8289')) {
        // ... (rest of logic same)
        const token = request.cookies.get('access_token');
        if (!token) {
            // return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin8289/:path*',
};
