"use client";

import { Dumbbell, TrendingUp, Trophy } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";

const features = [
  {
    icon: Dumbbell,
    title: "Log Exercises",
    description: "Quickly log sets, reps, and weights for any exercise.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "See how your lifts improve over time with clear charts.",
  },
  {
    icon: Trophy,
    title: "Hit Personal Records",
    description: "Automatic PR detection so you never miss a milestone.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight">
            Built for the Gym
          </h2>
          <p className="text-muted-foreground mt-3">
            Everything you need to make progress, nothing you don&apos;t.
          </p>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <Card className="bg-muted/40 hover:bg-muted/60 border-0 ring-0 transition-colors">
                <CardHeader className="gap-3">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                    <feature.icon className="text-primary size-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
