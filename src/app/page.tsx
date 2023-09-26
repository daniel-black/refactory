import { H1 } from "@/components/typography/H1";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="py-10 px-4">
      <strong>Refactory</strong>
      <H1>Write better code with AI</H1>
      <Link
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-lg pl-0 mt-10"
        )}
        href="/refactor"
      >
        Get Started →
      </Link>
    </div>
  );
}
