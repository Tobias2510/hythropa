"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type Entry = {
  id: string;
  weight: number;
  reps: number;
  createdAt: Date;
};

const weightConfig = {
  weight: { label: "Weight (kg)", color: "var(--color-primary)" },
} satisfies ChartConfig;

const repsConfig = {
  reps: { label: "Reps", color: "var(--color-primary)" },
} satisfies ChartConfig;

const volumeConfig = {
  volume: { label: "Volume (kg)", color: "var(--color-primary)" },
} satisfies ChartConfig;

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ExerciseCharts({ entries }: { entries: Entry[] }) {
  if (entries.length < 2) {
    return (
      <p className="text-muted-foreground text-center text-sm">
        Log at least 2 entries to see charts.
      </p>
    );
  }

  const data = [...entries]
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .map((e) => ({
      date: formatDate(e.createdAt),
      weight: e.weight,
      reps: e.reps,
      volume: e.weight * e.reps,
    }));

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium tracking-wide">Analytics</h2>

      <Card className="border-0 ring-0">
        <CardHeader>
          <CardTitle className="text-sm">Weight over time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={weightConfig} className="h-48 w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="var(--color-weight)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-0 ring-0">
        <CardHeader>
          <CardTitle className="text-sm">Reps over time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={repsConfig} className="h-48 w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="reps"
                stroke="var(--color-reps)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-0 ring-0">
        <CardHeader>
          <CardTitle className="text-sm">Volume over time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={volumeConfig} className="h-48 w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="var(--color-volume)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
