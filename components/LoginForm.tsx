// components/LoginForm.tsx

"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export function LoginForm() {
  const [errorMessage, formAction, isPending] =
    useActionState(
      authenticate,
      undefined
    );

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-medium"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-medium"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          minLength={6}
          required
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        />
      </div>

      <button
        type="submit"
        aria-disabled={isPending}
        disabled={isPending}
        className="w-full rounded-lg bg-[#0B2545] px-6 py-3 text-white hover:bg-[#081C33] disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>

      {errorMessage && (
        <p
          role="alert"
          aria-live="polite"
          className="text-sm text-red-600"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}