'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cigarette, PiggyBank, CalendarDays } from 'lucide-react';

interface Stats {
  daysSinceQuitting: number;
  moneySaved: number;
  cigarettesAvoided: number;
}

const statItems = [
  {
    title: 'Smoke-Free',
    key: 'daysSinceQuitting',
    icon: CalendarDays,
    formatter: (value: number) => `${value} days`,
  },
  {
    title: 'Money Saved',
    key: 'moneySaved',
    icon: PiggyBank,
    formatter: (value: number) =>
      `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
  },
  {
    title: 'Cigarettes Avoided',
    key: 'cigarettesAvoided',
    icon: Cigarette,
    formatter: (value: number) => value.toLocaleString(),
  },
];

export function StatsCards({ stats }: { stats: Stats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <item.icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <p className="text-lg font-bold font-headline">
              {item.formatter(stats[item.key as keyof Stats])}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
