"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter()
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      router.replace('/')
    }
  }, [token, router])

  const handleSubmit = () => {
    localStorage.removeItem('token')
    router.replace('/')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <h1 className="text-4xl font-bold mb-4">NotAlone AI</h1>
      <p className="text-lg text-gray-600 mb-6">
        Share your thoughts and feelings with AI. You are not alone ❤️
      </p>
      <div className="flex gap-3">
        <button onClick={handleSubmit} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500">
          Logout
        </button>
        <Link
          href="/chat"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Start Chatting
        </Link>
      </div>
      <p className="text-sm text-gray-700 sm:text-md font-medium text-center">
        <span className="font-bold text-gray-900">Note: </span>Chats aren’t saved — I forget everything. So, leave the negatives with me and carry only the positives with you ☺️
      </p>
    </div>
  );
}
