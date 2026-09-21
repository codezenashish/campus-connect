"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { HiCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/features/auth/actions/auth.action";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=~/\\`[\]]/.test(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const passwordCriteria = [
    { label: "At least 8 characters", isValid: hasMinLength },
    { label: "At least one special character (!@#$%^&*)", isValid: hasSpecialChar },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const pwd = formData.get("password") as string;
    const confirmPwd = formData.get("confirmPassword") as string;
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();

    if (!name) {
      setError("Please enter your full student name.");
      return;
    }

    if (!email) {
      setError("Please enter your verified college email.");
      return;
    }

    if (pwd !== confirmPwd) {
      setError("Passwords do not match. Please ensure both passwords match.");
      return;
    }

    if (pwd.length < 8 || !/[!@#$%^&*(),.?":{}|<>_\-+=~/\\`[\]]/.test(pwd)) {
      setError("Password must be at least 8 characters and include a special character.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await signup(formData);
        if (res?.error) {
          setError(res.error);
        } else if (res?.requiresConfirmation) {
          setSuccessMessage(res.message);
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
            : "Failed to create campus account. Please try again."
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
          <span>Verified Student Community</span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="mb-6">
        <h1 className="heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Join your campus
        </h1>
        <p className="subheading text-sm text-muted-foreground mt-1.5 leading-relaxed">
          Create your student account with your official college credentials.
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

      {/* Success Notice */}
      {successMessage && (
        <div
          role="status"
          className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs transition-all animate-in fade-in slide-in-from-top-1"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <p className="body-text text-emerald-700 dark:text-emerald-300 text-xs font-medium leading-relaxed">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Student Name */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label
            htmlFor="name"
            className="text-xs font-medium text-foreground tracking-tight cursor-pointer"
          >
            Student Name / Full Name
          </Label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Alex Chen"
              autoComplete="name"
              required
              className="h-11 rounded-xl pl-10 pr-4 bg-background border border-border shadow-none focus-visible:border-foreground text-sm transition-colors placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Verified College Email */}
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="email"
              className="text-xs font-medium text-foreground tracking-tight cursor-pointer"
            >
              Verified College Email
            </Label>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Verified domain
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
            Use your verified college email to join your campus community.
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
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-xl pl-10 pr-11 bg-background border border-border shadow-none focus-visible:border-foreground text-sm transition-colors placeholder:text-muted-foreground/50"
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

        {/* Password Validation Requirements */}
        <div className="flex flex-col gap-1.5 pt-0.5">
          {passwordCriteria.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  item.isValid
                    ? "bg-emerald-500 text-white dark:bg-emerald-600"
                    : "bg-muted text-muted-foreground/40 border border-border"
                }`}
                aria-hidden="true"
              >
                <HiCheck className="w-2.5 h-2.5 stroke-[2.5]" />
              </div>
              <span
                className={`text-[11px] transition-colors ${
                  item.isValid
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="confirmPassword"
              className="text-xs font-medium text-foreground tracking-tight cursor-pointer"
            >
              Confirm Password
            </Label>
            {passwordsMatch && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <HiCheck className="w-3 h-3 stroke-[2.5]" />
                Passwords match
              </span>
            )}
            {passwordsMismatch && (
              <span className="text-[11px] text-destructive font-medium">
                Does not match
              </span>
            )}
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`h-11 rounded-xl pl-10 pr-11 bg-background border shadow-none focus-visible:border-foreground text-sm transition-colors placeholder:text-muted-foreground/50 ${
                passwordsMismatch
                  ? "border-destructive focus-visible:border-destructive"
                  : "border-border"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3.5 p-1 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Campus Community Guidelines Note */}
        <p className="text-[11px] text-muted-foreground/75 leading-relaxed pt-1">
          By creating your account, you confirm that you are using an authorized institutional email and agree to your college campus code of conduct.
        </p>

        {/* Submit CTA */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 mt-1 rounded-xl font-medium text-sm cursor-pointer shadow-xs active:scale-[0.99] transition-all bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
              Activating campus account...
            </span>
          ) : (
            "Create Campus Account"
          )}
        </Button>
      </form>

      {/* Switch to Login Footer */}
      <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6 pt-4 border-t border-border/60">
        Already have a campus account?{" "}
        <Link
          href="/login"
          className="font-semibold text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          Sign in to Campus
        </Link>
      </p>
    </div>
  );
}
