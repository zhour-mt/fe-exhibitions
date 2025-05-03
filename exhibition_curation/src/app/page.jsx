"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-6">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md w-full">
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="CurationStudio Logo"
            width={80}
            height={0} 
            className="h-auto w-20"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-purple-700 mb-4">
          Welcome to CurationStudio!
        </h1>
        <p className="text-gray-600 mb-8">
          Discover and explore beautiful exhibitions.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/artworks" className="w-full">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
              Go to Artworks
            </button>
          </Link>

          <Link href="/login" className="w-full">
            <button className="w-full border border-purple-500 text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-all">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
