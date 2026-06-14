import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sridhar J | MERN Stack Developer Portfolio",
  description: "Welcome to the portfolio of Sridhar J, a passionate MERN Stack Developer specializing in Next.js, TypeScript, and modern web applications.",
  openGraph: {
    title: "Sridhar J | MERN Stack Developer Portfolio",
    description: "Welcome to the portfolio of Sridhar J, a passionate MERN Stack Developer specializing in Next.js, TypeScript, and modern web applications.",
    url: "https://sridharj.netlify.app",
    siteName: "Sridhar J Portfolio",
    images: [
      {
        url: "/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Sridhar J Developer Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sridhar J | MERN Stack Developer Portfolio",
    description: "Welcome to the portfolio of Sridhar J, a passionate MERN Stack Developer specializing in Next.js, TypeScript, and modern web applications.",
    images: ["/profile.jpeg"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
