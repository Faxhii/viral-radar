"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "INSERT_GOOGLE_CLIENT_ID_HERE";

    return (
        <ThemeProvider defaultTheme="dark">
            <GoogleOAuthProvider clientId={clientId}>
                {children}
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
}
