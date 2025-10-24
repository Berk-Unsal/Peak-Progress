'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MOTIVATIONAL_QUOTES } from '@/lib/quotes';
import { Lightbulb } from 'lucide-react';

interface MotivationalCardProps {
  daysSinceQuitting: number;
}

export function MotivationalCard({ daysSinceQuitting }: MotivationalCardProps) {
  // This function generates a pseudo-random number based on the day.
  // It ensures the quote is the same for the entire day but different each day.
  const getDailyRandomIndex = (day: number, arrayLength: number) => {
    const seed = day;
    // A simple pseudo-random number generator function.
    const pseudoRandom = (seed: number) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    const randomIndex = Math.floor(pseudoRandom(seed) * arrayLength);
    return randomIndex;
  };

  const quote = useMemo(() => {
    const index = getDailyRandomIndex(daysSinceQuitting, MOTIVATIONAL_QUOTES.length);
    return MOTIVATIONAL_QUOTES[index];
  }, [daysSinceQuitting]);

  return (
    <Card>
      <CardContent className="pt-6 flex items-center gap-4">
        <Lightbulb className="h-8 w-8 text-accent shrink-0" />
        <blockquote className="text-base italic text-foreground/80">
          "{quote}"
        </blockquote>
      </CardContent>
    </Card>
  );
}
