"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./chat/components/loading";

export default function RegisterPage() {

  const router = useRouter()
  const [form, setForm] = useState({ username: "", password: "" });
  const [buttonName, setButtonName] = useState(true)
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", form);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || data.message || "Something went wrong");
        throw new Error(data.detail || data.message || "Something went wrong");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      alert("Welcome to NotAlone Ai");
      router.replace("/home");

    } catch (err) {
      console.error("Login/Register failed:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <header className="p-4 sm:p-6 border-b bg-blue-700 shadow-sm">
        <h1 className="text-lg sm:text-2xl font-bold text-center text-gray-50">
          Chat with NotAlone
        </h1>
      </header>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {buttonName ? "Login user" : "Create an account"}
          </h1>

          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              >
                {buttonName ? "Login" : "Register"}
              </button>
            </form>
          )}


          <p className="text-sm text-gray-600 text-center mt-6">
            {buttonName ? "Don't have an account? " : "Already have an account? "}
            <Link
              onClick={() => setButtonName((prev) => !prev)}
              href="/"
              className="text-indigo-600 font-medium hover:underline"
            >
              {buttonName ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
