import "./globals.css";
import { Providers } from "@/components/Providers";

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
        <style dangerouslySetInnerHTML={{
          __html: `
          body {
            font-family: 'Inter', sans-serif !important;
            background-color: #030014 !important;
            color: white !important;
          }
           h1, h2, h3, h4, h5, h6, .text-heading {
            font-family: 'Outfit', sans-serif !important;
          }
        `}} />
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
        </Providers>
      </body>
    </html>
  );
}
