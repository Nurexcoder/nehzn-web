import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// DM Sans carries everything; Playfair appears only as an italic, inside
// headlines, so emphasis has a different voice rather than just a colour.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
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
  themeColor: "#FBFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
