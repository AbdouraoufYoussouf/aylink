import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MyProviders from "@/components/providers/my-provider";
import { auth } from "@/auth";
import NextTopLoader from 'nextjs-toploader';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rafien",
  description: "Créateur de contenu et developeur web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        <MyProviders session={session}>
          <main>{children}</main>
        </MyProviders>
      </body>
    </html>
  );
}
