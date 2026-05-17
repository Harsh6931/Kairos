import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthVisualPanel } from "@/components/auth/AuthVisualPanel";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [
    { title: "Sign in — SYNTAXIS" },
    { name: "description", content: "Sign in or create a SYNTAXIS account." },
  ]}),
});

function AuthPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid md:grid-cols-2">
      <AuthVisualPanel />
      <div className="flex items-center justify-center p-6 sm:p-12">
        <AuthForm />
      </div>
    </div>
  );
}
