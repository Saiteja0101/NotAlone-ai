"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ChatPage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (!storedToken) {
      router.replace("/");
    }
  }, [router]);


  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    //const localUrl = "http://127.0.0.1:8000/chat"
    try {
      const response = await fetch("https://notalone-ai.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // ✅ Attach token
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Something went wrong");
      }


      const data = await response.json();

      // Append new message instead of replacing all messages
      setMessages((prev) => [...prev, { role: "user", text: input }, { role: "ai", text: data.reply }]);

      // ✅ Clear input here
      setInput("");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex flex-col h-screen bg-gray-200 overflow-hidden">
      {/* Header */}
      <header className="flex gap-5 p-4 sm:p-6 border-b bg-blue-700 shadow-sm">
        <Link
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          href={'/home'}
        >
          <ArrowLeftIcon className="h-5 w-6 text-white cursor-pointer hover:text-gray-200" />
        </Link>
        <Link
          className="text-lg sm:text-2xl font-bold text-center text-gray-50"
          href={'/home'}
        >
          NotAlone
        </Link>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 max-w-full w-full mx-2 sm:mx-2">
        {messages.length === 0 ? (
          <p className="text-gray-800 text-center mt-10">
            Start the conversation!
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 flex transition-all duration-300 ease-out transform ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              style={{
                animation: "fadeInUp 0.3s ease-out",
                animationFillMode: "forwards",
              }}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] sm:max-w-[60%] text-sm sm:text-base break-words shadow-sm ${msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <footer className="border-t bg-white p-3 sm:p-4">
        <div className="flex gap-2 max-w-5xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`px-5 py-2 rounded-full text-sm sm:text-base shadow-sm transition-colors ${input.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Send
          </button>

        </div>
        <p className="text-sm text-gray-800 mt-2 text-center font-bold">
          Hold on to the light of positives, and let me bear the weight of the negatives ☺️
        </p>
      </footer>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
