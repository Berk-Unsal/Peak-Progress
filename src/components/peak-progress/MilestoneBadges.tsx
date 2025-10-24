'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MILESTONES } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Mountain } from 'lucide-react';

interface MilestoneBadgesProps {
  daysSinceQuitting: number;
}

export function MilestoneBadges({ daysSinceQuitting }: MilestoneBadgesProps) {
  const earnedMilestones = MILESTONES.filter(
    (m) => daysSinceQuitting >= m.days
  );
  const nextMilestone = MILESTONES.find((m) => daysSinceQuitting < m.days);

  const MAX_DAYS_TO_PEAK = 90;
  const peaksConquered = Math.floor(daysSinceQuitting / MAX_DAYS_TO_PEAK);

  const peakBadges = Array.from({ length: peaksConquered }, (_, i) => ({
    name: `${i + 1} Peak`,
    description: `${i + 1} peak${i > 0 ? 's' : ''} conquered!`,
    icon: Mountain,
  }));

  const allBadges = [...earnedMilestones, ...peakBadges];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        {allBadges.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            <TooltipProvider>
              {allBadges.map((milestone) => (
                <Tooltip key={milestone.name}>
                  <TooltipTrigger>
                    <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-secondary/50 border-2 border-transparent hover:border-accent transition-all animate-in fade-in-50 zoom-in-95">
                      <milestone.icon className="h-8 w-8 text-accent" />
                      <span className="text-xs font-semibold">{milestone.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{milestone.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Your first milestone is just around the corner!</p>
        )}
        {nextMilestone && (
          <div className="mt-4">
            <p className="text-sm font-medium">Next up:</p>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <nextMilestone.icon className="h-5 w-5" />
              <span>
                {nextMilestone.name} in {nextMilestone.days - daysSinceQuitting} days
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
