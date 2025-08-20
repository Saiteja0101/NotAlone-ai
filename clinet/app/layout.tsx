import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "NotAlone AI",
  description: "Share your feelings with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-200 text-gray-800">
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
