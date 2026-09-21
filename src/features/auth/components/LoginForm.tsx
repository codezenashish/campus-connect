"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/features/auth/actions/auth.action";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const res = await login(formData);
        if (res?.error) {
          setError(res.error);
        }
      } catch (err: unknown) {
        if (
          err &&
          typeof err === "object" &&
          "digest" in err &&
          typeof (err as { digest: unknown }).digest === "string" &&
          (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
        ) {
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : "Failed to sign in. Please verify your college credentials."
        );
      }
    });
  };

  return (
    <div className="w-full max-w-md flex flex-col mx-auto">
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute top-0 left-0 w-3.5 h-3.5 rounded-sm bg-primary transition-transform group-hover:scale-105" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-sm bg-primary/70 transition-transform group-hover:scale-105" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            CampusConnect
          </span>
        </Link>

        {/* Small Branded Informational Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Verified Campus Network</span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="mb-6">
        <h1 className="heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Sign in to Campus
        </h1>
        <p className="subheading text-sm text-muted-foreground mt-1.5 leading-relaxed">
          Enter your verified college email to access your campus community.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs transition-all animate-in fade-in slide-in-from-top-1"
        >
          <p className="body-text text-destructive text-xs font-medium">
            {error}
          </p>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Verified College Email */}
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="email"
              className="text-xs font-medium text-foreground tracking-tight cursor-pointer"
            >
              College Email
            </Label>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Institutional access
            </span>
          </div>

          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="student@college.edu"
              autoComplete="email"
              required
              className="h-11 rounded-xl pl-10 pr-4 bg-background border border-border shadow-none focus-visible:border-foreground text-sm transition-colors placeholder:text-muted-foreground/50"
            />
          </div>
          <p className="text-[11px] text-muted-foreground/85">
            Only verified college email addresses can access Campus Connect.
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label
            htmlFor="password"
            className="text-xs font-medium text-foreground tracking-tight cursor-pointer"
          >
            Password
          </Label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="h-11 rounded-xl pl-10 pr-11 bg-background border border-border shadow-none focus-visible:border-foreground text-sm transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 p-1 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" />
            <Label
              htmlFor="remember"
              className="text-xs text-muted-foreground font-normal cursor-pointer select-none"
            >
              Remember this device for 30 days
            </Label>
          </div>
          <Link
            href="#"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 mt-1 rounded-xl font-medium text-sm cursor-pointer shadow-xs active:scale-[0.99] transition-all bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
              Signing in to campus...
            </span>
          ) : (
            "Sign in to Campus"
          )}
        </Button>
      </form>

      {/* Institutional Assistance / Secondary Note */}
      <div className="mt-6 pt-5 border-t border-border/60 text-center">
        <p className="text-xs text-muted-foreground">
          Trouble signing in with your college credentials?{" "}
          <span className="text-foreground/90 font-medium cursor-pointer hover:underline">
            Contact campus administrator
          </span>
        </p>
      </div>

      {/* Switch to Signup Footer */}
      <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4">
        New to campus?{" "}
        <Link
          href="/signup"
          className="font-semibold text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          Join your campus community
        </Link>
      </p>
    </div>
  );
}
