import type { Metadata, Viewport } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Sora echoes the geometric construction of the mark; Hanken Grotesk keeps
// body copy quiet underneath it.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = "Nehzn — Find your people. Naturally.";
const description =
  "People are more than a profile. Nehzn helps you discover the little things you have in common — and the people you might naturally click with in the real world.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://nehzn.com"),
  title,
  description,
  applicationName: "Nehzn",
  keywords: [
    "Nehzn",
    "make friends",
    "meet people nearby",
    "friendship app",
    "social discovery",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Nehzn",
  },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/brand/mark.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FDFCFB",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sora.variable} ${hanken.variable} antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
