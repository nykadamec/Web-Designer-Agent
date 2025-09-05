import React, { useState } from "react";

/**
 * Auth — Login & Register (single-file, responsive, accessible)
 * - Mobile-first layout with a centered card
 * - Toggle between Login and Register
 * - Email/password validation hints (client-side placeholders)
 * - Password visibility toggle
 * - Keyboard & screen reader friendly
 * - Tailwind utility classes only (no external UI libs required)
 */

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fake submit handler (replace with your API call)
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 900); // demo only
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100">
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div aria-hidden className="size-8 rounded-xl bg-zinc-900 dark:bg-zinc-50 grid place-items-center text-white dark:text-zinc-900">
            <span className="text-xs font-bold">AI</span>
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-semibold">Your WebApp</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Sign in or create account</p>
          </div>
        </div>
        <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 rounded-md px-2 py-1">
          Need help?
        </a>
      </header>

      <main className="px-4 sm:px-6">
        <section className="mx-auto w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-zinc-900/50 shadow-xl shadow-zinc-950/5">
            {/* Tabs */}
            <nav aria-label="Auth tabs" className="grid grid-cols-2">
              <button
                className={[
                  "py-3 text-sm font-medium rounded-tl-2xl transition",
                  mode === "login"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    : "bg-zinc-50/70 dark:bg-zinc-900/30 text-zinc-500 hover:text-zinc-900 hover:dark:text-zinc-100"
                ].join(" ")}
                aria-selected={mode === "login"}
                role="tab"
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={[
                  "py-3 text-sm font-medium rounded-tr-2xl transition",
                  mode === "register"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    : "bg-zinc-50/70 dark:bg-zinc-900/30 text-zinc-500 hover:text-zinc-900 hover:dark:text-zinc-100"
                ].join(" ")}
                aria-selected={mode === "register"}
                role="tab"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </nav>

            {/* Panel */}
            <div role="tabpanel" className="p-5 sm:p-6">
              {mode === "login" ? (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/60"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPass ? "text" : "password"}
                        required
                        minLength={6}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 pr-10 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        className="absolute inset-y-0 right-0 px-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none"
                        aria-label={showPass ? "Hide password" : "Show password"}
                        title={showPass ? "Hide password" : "Show password"}
                      >
                        {showPass ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5"><path d="M3 3l18 18" strokeWidth="1.6"/><path d="M10.7 10.7a3 3 0 004.6 3.6" strokeWidth="1.6"/><path d="M9.9 5.2A9.7 9.7 0 0121 12c-1.5 2.6-4.9 6-9 6-1.4 0-2.7-.3-3.9-.8" strokeWidth="1.6"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" strokeWidth="1.6"/><circle cx="12" cy="12" r="3.2" strokeWidth="1.6"/></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 select-none">
                      <input type="checkbox" className="size-4 rounded border-zinc-300 dark:border-zinc-700" />
                      Remember me
                    </label>
                    <a href="#" className="text-xs font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 rounded-md px-1">Forgot password?</a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-2.5 text-sm font-medium shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 disabled:opacity-60"
                    aria-busy={loading}
                  >
                    {loading ? "Signing in…" : "Sign in"}
                  </button>

                  <div className="relative py-3 text-center text-xs text-zinc-500">
                    <span className="bg-white dark:bg-zinc-900 px-2 relative z-10">or continue with</span>
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-zinc-200 dark:border-zinc-800" aria-hidden />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <OAuthButton label="Google" svg={GoogleIcon} />
                    <OAuthButton label="GitHub" svg={GitHubIcon} />
                    <OAuthButton label="Apple" svg={AppleIcon} />
                  </div>
                </form>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      autoComplete="name"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/60"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email2" className="text-sm font-medium">Email</label>
                    <input
                      id="email2"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/60"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="password2" className="text-sm font-medium">Password</label>
                    <input
                      id="password2"
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/60"
                    />
                    <p className="text-xs text-zinc-500">Use 8+ characters with a mix of letters, numbers & symbols.</p>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="confirm" className="text-sm font-medium">Confirm password</label>
                    <input
                      id="confirm"
                      name="confirm"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/60"
                    />
                  </div>

                  <label className="inline-flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 select-none">
                    <input required type="checkbox" className="mt-0.5 size-4 rounded border-zinc-300 dark:border-zinc-700" />
                    <span>
                      I agree to the <a href="#" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">Terms</a> and <a href="#" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">Privacy Policy</a>.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-2.5 text-sm font-medium shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 disabled:opacity-60"
                    aria-busy={loading}
                  >
                    {loading ? "Creating account…" : "Create account"}
                  </button>

                  <p className="text-xs text-center text-zinc-600 dark:text-zinc-400">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setMode("login")} className="font-medium underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
                      Sign in
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-zinc-500 mt-6">
            By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
          </p>
        </section>
      </main>

      <footer className="px-4 sm:px-6 py-8">
        <div className="mx-auto max-w-md text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/** ————— Reusable OAuth Button ————— */
function OAuthButton({ label, svg: Svg }: { label: string; svg: React.FC<React.SVGProps<SVGSVGElement>> }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm font-medium shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400"
    >
      <Svg className="size-4" aria-hidden />
      <span className="sr-only">Continue with </span>
      {label}
    </button>
  );
}

/** ————— Simple inline brand icons (no external deps) ————— */
const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.3 32.7 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.2 6.8 29.4 5 24 5 12.4 5 3 14.4 3 26s9.4 21 21 21 21-9.4 21-21c0-1.9-.2-3.5-.4-5.5z"/>
    <path fill="#0F9D58" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.2 6.8 29.4 5 24 5 16 5 9 9.6 6.3 14.7z"/>
    <path fill="#31A8FF" d="M24 47c5 0 9.5-1.9 12.9-5l-6-4.9C29 38.4 26.6 39 24 39c-5 0-9.3-3.3-11.2-7.9l-6.5 5C9 43.9 16 47 24 47z"/>
    <path fill="#F44336" d="M43.6 20.5H42V20H24v8h11.3c-1.3 4.7-5.6 8-11.3 8-5 0-9.3-3.3-11.2-7.9l-6.5 5C9 43.9 16 47 24 47c11.6 0 21-9.4 21-21 0-1.9-.2-3.5-.4-5.5z"/>
  </svg>
);

const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.9 3.1 9 7.3 10.5.5.1.7-.2.7-.5v-2c-3 .7-3.6-1.5-3.6-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7.7 1.9 1 .3-.7.6-1 .9-1.2-2.4-.2-4.9-1.2-4.9-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 .9-.3 3 1.1a10.7 10.7 0 015.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.2-2.5 5.2-4.9 5.5.5.5 1 1.4 1 2.8v4.2c0 .3.2.6.7.5 4.3-1.4 7.3-5.6 7.3-10.5C23.1 5.3 18.3.5 12 .5z"/>
  </svg>
);

const AppleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.4 1.9c0 1-.4 1.9-1 2.6-.7.8-1.8 1.4-2.9 1.3-.1-1 .4-2.1 1-2.8.7-.8 1.9-1.4 2.9-1.5.1.1.1.2 0 .4zM21.5 18.1c-.4.9-.8 1.8-1.5 2.6-.8.9-1.7 1.9-3 1.9-1.3 0-1.7-.6-3.2-.6s-2 .6-3.2.6-2.2-1-3-1.9c-2-2.3-3.5-6.5-1.5-9.4 1-1.4 2.7-2.3 4.4-2.4 1.3 0 2.6.7 3.1.7s2.1-1 3.5-.9c1.5.1 2.9.8 3.7 1.9-3.2 1.9-2.7 6.2.5 7.5z"/>
  </svg>
);
