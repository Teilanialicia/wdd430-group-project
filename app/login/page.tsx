'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/layout/button";
import { authenticate, createUser } from "../actions/auth/auth";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setError("");

    // const error = await authenticate({email, password});
    // const newUser = await createUser({
    //   email,
    //   password,
    //   phone: "",
    //   username: "name"
    // })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--color-secondary) px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-6 text-center text-(--color-primary)">
          Login
        </h1>

        <form action={authenticate} className="flex flex-col gap-4">

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
            required
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
            required
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-(--color-primary) text-white py-3 rounded-lg hover:opacity-90"
          >
            Login
          </button>

        </form>

        {/* Optional: Navigate to signup */}
        <div className="mt-6 text-center">
          <Button
            action="navigate"
            navigateUrl="/join"
            className="text-(--color-accent) underline cursor-pointer"
          >
            Don't have an account? Sign up
          </Button>
        </div>

      </div>
    </main>
  );
}