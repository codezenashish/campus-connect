import type { Metadata } from "next";
import { AuthHero, SignupForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "University Portal Registration | CampusConnect",
  description:
    "Secure college authentication portal. Create a verified account on CampusConnect to connect with students, join project teams, and access campus opportunities.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen w-full bg-background flex flex-col justify-center p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-360 mx-auto min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] lg:min-h-[calc(100vh-48px)] flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 items-stretch">
        {/* Left Side: Testimonial & Editorial Hero Card */}
        <AuthHero />

        {/* Right Side: University Registration Form */}
        <div className="w-full flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 md:px-8">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
