"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <h1 className="text-4xl font-bold mb-4">NotAlone AI</h1>
      <p className="text-lg text-gray-600 mb-6">
        Share your thoughts and feelings with AI. You are not alone ❤️
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
        >
          Logout
        </Link>
        <Link
          href="/chat"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Start Chatting
        </Link>
      </div>
    </div>
  );
}
