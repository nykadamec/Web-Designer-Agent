<!doctype html>
<html lang="en" class="h-full" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Coming Soon — Minimal Web App Landing</title>
    <meta name="description" content="A minimal, accessible Coming Soon page with email capture and countdown." />
    <meta name="color-scheme" content="light dark" />
    <!-- Tailwind 4 (standalone runtime) -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
      /* Smooth fonts + subtle selection */
      :root { color-scheme: light dark; }
      ::selection { background: rgba(99,102,241,.25); }
    </style>
  </head>
  <body class="min-h-dvh bg-neutral-50 text-neutral-900 antialiased selection:bg-indigo-200/40 dark:bg-neutral-950 dark:text-neutral-100">
    <main class="relative flex min-h-dvh items-center justify-center px-6 py-16">
      <!-- Background accent (very subtle) -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
        <div class="mx-auto h-[40rem] w-[40rem] bg-[radial-gradient(closest-side,theme(colors.indigo.500)/10%,transparent_60%)] blur-3xl dark:bg-[radial-gradient(closest-side,theme(colors.indigo.400)/14%,transparent_60%)]"></div>
      </div>

      <section class="mx-auto w-full max-w-3xl text-center">
        <!-- Brand / Logo -->
        <div class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900/5 shadow-sm ring-1 ring-neutral-950/5 dark:bg-white/5 dark:ring-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6">
            <path d="M12 3l8.66 5v8L12 21 3.34 16V8L12 3Z" />
            <path d="M12 8v13" opacity=".35" />
          </svg>
        </div>

        <!-- Headline -->
        <h1 class="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          We’re launching soon
        </h1>
        <p class="mx-auto mt-4 max-w-prose text-pretty text-base text-neutral-600 dark:text-neutral-300">
          Something minimal, fast, and thoughtfully designed. Leave your email and we’ll ping you the moment we open.
        </p>

        <!-- Countdown -->
        <div class="mx-auto mt-8 grid w-full max-w-lg grid-cols-4 gap-3">
          <div class="rounded-xl border border-neutral-900/5 bg-white/80 p-3 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div id="dd" class="text-2xl font-semibold tabular-nums">00</div>
            <div class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Days</div>
          </div>
          <div class="rounded-xl border border-neutral-900/5 bg-white/80 p-3 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div id="hh" class="text-2xl font-semibold tabular-nums">00</div>
            <div class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Hours</div>
          </div>
          <div class="rounded-xl border border-neutral-900/5 bg-white/80 p-3 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div id="mm" class="text-2xl font-semibold tabular-nums">00</div>
            <div class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Minutes</div>
          </div>
          <div class="rounded-xl border border-neutral-900/5 bg-white/80 p-3 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div id="ss" class="text-2xl font-semibold tabular-nums">00</div>
            <div class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Seconds</div>
          </div>
        </div>

        <!-- Email capture -->
        <form id="notifyForm" class="mx-auto mt-8 flex w-full max-w-lg flex-col gap-2 sm:flex-row" novalidate>
          <label class="sr-only" for="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            placeholder="you@example.com"
            aria-describedby="emailHelp"
            class="w-full rounded-xl border border-neutral-900/10 bg-white/80 px-4 py-3 text-base shadow-sm outline-none ring-indigo-500/0 placeholder:text-neutral-400 backdrop-blur-sm focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
          <button
            type="submit"
            class="inline-flex select-none items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition active:translate-y-px hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Notify me
          </button>
          <p id="emailHelp" class="text-center text-xs text-neutral-500 dark:text-neutral-400">No spam. Unsubscribe anytime.</p>
          <div id="status" class="sr-only" aria-live="polite"></div>
        </form>

        <!-- Links -->
        <div class="mt-6 flex items-center justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <a href="#" class="underline-offset-4 hover:underline">Privacy</a>
          <span aria-hidden="true">•</span>
          <a href="#" class="underline-offset-4 hover:underline">Contact</a>
        </div>

        <!-- Footer note -->
        <p class="mt-10 text-xs text-neutral-500 dark:text-neutral-400">
          © <span id="year"></span> YourBrand. All rights reserved.
        </p>
      </section>
    </main>

    <script>
      // === Editable launch date (ISO). Set your target and we do the rest.
      // Example below = Oct 1, 2025 at 12:00 (Prague) => 10:00 UTC
      const LAUNCH_ISO = '2025-10-01T10:00:00Z';

      const el = (id) => document.getElementById(id);
      const dd = el('dd'), hh = el('hh'), mm = el('mm'), ss = el('ss');

      function updateCountdown() {
        const now = new Date();
        const target = new Date(LAUNCH_ISO);
        let diff = target - now;
        if (diff < 0) diff = 0;

        const sec = Math.floor(diff / 1000);
        const days = Math.floor(sec / 86400);
        const hours = Math.floor((sec % 86400) / 3600);
        const mins = Math.floor((sec % 3600) / 60);
        const secs = sec % 60;

        dd.textContent = String(days).padStart(2, '0');
        hh.textContent = String(hours).padStart(2, '0');
        mm.textContent = String(mins).padStart(2, '0');
        ss.textContent = String(secs).padStart(2, '0');
      }
      updateCountdown();
      setInterval(updateCountdown, 1000);

      // Email capture (client-only demo). Replace with your backend or service.
      const form = el('notifyForm');
      const emailInput = el('email');
      const status = el('status');

      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const valid = /.+@.+\..+/.test(email);
        if (!valid) {
          emailInput.setAttribute('aria-invalid', 'true');
          emailInput.classList.add('ring-2');
          status.classList.remove('sr-only');
          status.textContent = 'Please enter a valid email address.';
          return;
        }
        emailInput.removeAttribute('aria-invalid');
        emailInput.classList.remove('ring-2');

        try {
          const key = 'coming-soon-subscribers';
          const list = JSON.parse(localStorage.getItem(key) || '[]');
          list.push({ email, ts: Date.now() });
          localStorage.setItem(key, JSON.stringify(list));
        } catch {}

        status.classList.remove('sr-only');
        status.textContent = 'Thanks! We\'ll be in touch.';
        form.reset();
      });

      // Footer year
      el('year').textContent = new Date().getFullYear();
    </script>
  </body>
</html>
