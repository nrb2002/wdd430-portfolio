// app/login/page.tsx

import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Sign In
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}