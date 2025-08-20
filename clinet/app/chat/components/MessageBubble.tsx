interface MessageBubbleProps {
  sender: string;
  text: string;
}

export default function MessageBubble({ sender, text }: MessageBubbleProps) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 font-bold"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
