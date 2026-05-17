// Stub auth module — replace body with Clerk later.
// UI calls these; signatures stay stable.
export const auth = {
  async signIn({ email, password }: { email: string; password: string }) {
    console.log("[auth stub] signIn", email, password.length);
    await new Promise(r => setTimeout(r, 600));
    return { ok: true as const, user: { email } };
  },
  async signUp({ email, password, name }: { email: string; password: string; name: string }) {
    console.log("[auth stub] signUp", email, name);
    await new Promise(r => setTimeout(r, 600));
    return { ok: true as const, user: { email, name } };
  },
  async signInWithProvider(provider: "google" | "github") {
    console.log("[auth stub] provider", provider);
    return { ok: false as const, message: "Connect Clerk to enable" };
  },
};
