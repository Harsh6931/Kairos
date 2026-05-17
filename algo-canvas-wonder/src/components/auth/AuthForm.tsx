import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const SignIn = z.object({
  email: z.string().email(),
  password: z.string().min(6, "min 6 chars"),
});
const SignUp = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6, "min 6 chars"),
});
type SignInValues = z.infer<typeof SignIn>;
type SignUpValues = z.infer<typeof SignUp>;

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md">
      <div className="font-mono text-xs text-muted-foreground mb-2">// authenticate</div>
      <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
        {mode === "signin" ? "Welcome back." : "Create account."}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {mode === "signin" ? "Sign in to save runs and unlock the lab." : "Join SYNTAXIS — it takes a second."}
      </p>

      <div className="mt-6 inline-flex rounded-md border border-border p-1 font-mono text-xs">
        {(["signin", "signup"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setMsg(null); }}
            className={`px-3 py-1.5 rounded ${mode === m ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
            {m === "signin" ? "Sign in" : "Sign up"}
          </button>
        ))}
      </div>

      {mode === "signin" ? <SignInForm setMsg={setMsg} /> : <SignUpForm setMsg={setMsg} />}

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase">or continue with</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["google", "github"].map(p => (
          <button key={p} onClick={async () => { const r = await auth.signInWithProvider(p as "google" | "github"); setMsg(r.message ?? "ok"); }}
            className="px-3 py-2 rounded-md border border-border font-mono text-xs hover:border-accent/50 hover:text-accent capitalize">
            {p}
          </button>
        ))}
      </div>
      {msg && <div className="mt-4 px-3 py-2 rounded-md bg-muted/30 border border-border font-mono text-xs text-accent">{msg}</div>}
      <p className="mt-6 text-[11px] font-mono text-muted-foreground">
        // wire Clerk in src/lib/auth.ts — UI stays the same
      </p>
    </div>
  );
}

function SignInForm({ setMsg }: { setMsg: (s: string) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInValues>({ resolver: zodResolver(SignIn) });
  return (
    <form onSubmit={handleSubmit(async v => { const r = await auth.signIn(v); setMsg(r.ok ? `Signed in as ${r.user.email}` : "Failed"); })}
      className="mt-4 space-y-3">
      <Field label="Email" error={errors.email?.message}>
        <input {...register("email")} type="email" autoComplete="email" className={inputCls} placeholder="you@domain.com" />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <input {...register("password")} type="password" autoComplete="current-password" className={inputCls} placeholder="••••••••" />
      </Field>
      <button disabled={isSubmitting} className="w-full mt-2 px-4 py-2.5 rounded-md bg-accent text-accent-foreground font-mono text-sm flex items-center justify-center gap-2 disabled:opacity-60">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Sign in →
      </button>
    </form>
  );
}

function SignUpForm({ setMsg }: { setMsg: (s: string) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpValues>({ resolver: zodResolver(SignUp) });
  return (
    <form onSubmit={handleSubmit(async v => { const r = await auth.signUp(v); setMsg(r.ok ? `Welcome, ${r.user.name}` : "Failed"); })}
      className="mt-4 space-y-3">
      <Field label="Name" error={errors.name?.message}>
        <input {...register("name")} className={inputCls} placeholder="Ada Lovelace" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input {...register("email")} type="email" className={inputCls} placeholder="you@domain.com" />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <input {...register("password")} type="password" className={inputCls} placeholder="••••••••" />
      </Field>
      <button disabled={isSubmitting} className="w-full mt-2 px-4 py-2.5 rounded-md bg-accent text-accent-foreground font-mono text-sm flex items-center justify-center gap-2 disabled:opacity-60">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Create account →
      </button>
    </form>
  );
}

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-accent transition-colors";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <div className="mt-1 font-mono text-xs text-destructive">{error}</div>}
    </label>
  );
}
