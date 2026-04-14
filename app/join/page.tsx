'use client'

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { register } from "../actions/auth/register";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const [error, formAction, isPending] = useActionState(
    register,
    undefined
  );

  const router = useRouter();
  const { update } = useSession();

  useEffect(() => {
    if (error === "success") {
      router.push('/');
    }
  }, [error, router, update]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--color-secondary) px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-6 text-center text-(--color-primary)">
          Join
        </h1>

        <form action={formAction} className="flex flex-col gap-4">

          {/* Username */}
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
            required
          />

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

          {/* Phone */}
          <input
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
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
          {error && error !== "success" && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-(--color-primary) text-white py-3 rounded-lg hover:opacity-90"
            aria-disabled={isPending}
          >
            Create account
          </button>

        </form>

        {/* Login link */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-(--color-accent) underline cursor-pointer"
          >
            Already have an account? Log in
          </Link>
        </div>

      </div>
    </main>
  );
}