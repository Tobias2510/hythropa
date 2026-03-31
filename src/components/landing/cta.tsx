"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./animated-section";

export function CTA() {
  return (
    <section className="px-6 py-20 md:py-32">
      <AnimatedSection>
        <div className="bg-muted/30 ring-border/50 mx-auto max-w-lg rounded-2xl px-6 py-16 text-center ring-1 md:px-12">
          <h2 className="text-foreground text-3xl font-bold tracking-tight">
            Start Tracking Today
          </h2>
          <p className="text-muted-foreground mt-3">
            Free to use. No credit card required.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="px-6">
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
