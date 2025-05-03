import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Exhibition Curation",
  description: "Build your own exhibition! Save some artworks :)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="sticky top-0 bg-purple-600 text-white flex items-center justify-between px-4">
          <Link href="/" className="inline-block">
            <Image
              src="/icons8-home.svg"
              alt="Home"
              width={45}
              height={45}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="flex-1 text-center">
            Discover art you love, curate your own exhibition!
          </div>
          <Link href="/register" className="inline-block">
            <Image
              src="/user.svg"
              alt="Home"
              width={45}
              height={45}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="w-6" />
        </div>
        {children}
      </body>
    </html>
  );
}
