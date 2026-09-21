import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SitePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Link href="/signup">
        <Button size="lg" className="px-6 py-2 text-base font-semibold cursor-pointer">
          Sign Up
        </Button>
      </Link>
    </main>
  );
}
