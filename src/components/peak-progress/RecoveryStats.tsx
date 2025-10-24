'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetchRecoveryStats } from '@/lib/actions';
import { Loader2, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { PersonalizedLungRecoveryStatsInput } from '@/ai/flows/personalized-lung-recovery-stats';

interface RecoveryStatsProps {
  input: PersonalizedLungRecoveryStatsInput;
}

export function RecoveryStats({ input }: RecoveryStatsProps) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState('');
  const [error, setError] = useState('');

  const handleFetchStats = async () => {
    setLoading(true);
    setError('');
    const result = await fetchRecoveryStats(input);
    if (result.success) {
      setStats(result.data!);
    } else {
      setError(result.error!);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={handleFetchStats}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          My Recovery Progress
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" />
            Your Personalized Recovery
          </DialogTitle>
          <DialogDescription>
            Here's a look at how your body is healing, based on your journey.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 text-sm prose dark:prose-invert">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <p>{stats}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
