'use client'

import { useEffect, useState } from "react";
import Button from "../ui/layout/button";
import { authenticate } from "../actions/auth/auth";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )
  const router = useRouter();
  const { update } = useSession();

  useEffect(() => {
    if (error === "success") {
      update();
      router.push('/');
    }
  }, [error, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--color-secondary) px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-6 text-center text-(--color-primary)">
          Login
        </h1>

        <form action={formAction} className="flex flex-col gap-4">

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
            aria-disabled={isPending}
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