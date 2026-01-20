import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Outfit:wght@300..900&display=swap" rel="stylesheet" />

      </head>
      <body
        className="antialiased font-sans"
        style={{
          '--font-inter': '"Inter", sans-serif',
          '--font-outfit': '"Outfit", sans-serif',
        } as React.CSSProperties}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
