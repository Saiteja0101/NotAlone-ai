"use client";
import { useState } from "react";
import MessageBubble from "./MessageBubble";

interface ChatBoxProps {
  messages: { sender: string; text: string }[];
  onSend: (msg: string) => void;
}

export default function ChatBox({ messages, onSend }: ChatBoxProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto p-2 bg-gray-100 rounded-lg">
        {messages.map((m, i) => (
          <MessageBubble key={i} sender={m.sender} text={m.text} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-2">
        <input
          className="flex-1 border rounded-l-lg p-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
