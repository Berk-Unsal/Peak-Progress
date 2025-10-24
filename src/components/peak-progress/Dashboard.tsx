'use client';

import type { UserData } from '@/lib/types';
import { differenceInDays, parseISO } from 'date-fns';
import { Header } from './Header';
import { MountainScene } from './MountainScene';
import { StatsCards } from './StatsCards';
import { RecoveryStats } from './RecoveryStats';
import { MilestoneBadges } from './MilestoneBadges';
import { DebugControls } from './DebugControls';
import { MotivationalCard } from './MotivationalCard';
import type { User } from 'firebase/auth';


interface DashboardProps {
  userData: UserData;
  user: User | null;
  onReset: () => void;
  onAddDay: () => void;
  onRemoveDay: () => void;
  onRelapse: () => void;
  onHourChange: (hour: number) => void;
  debugHour: number | null;
}

export function Dashboard({ userData, user, onReset, onAddDay, onRemoveDay, onRelapse, onHourChange, debugHour }: DashboardProps) {
  const { quitDate, cigarettesPerDay, yearsSmoked, packPrice, packSize } = userData;

  const daysSinceQuitting = quitDate ? differenceInDays(new Date(), parseISO(quitDate)) : 0;
  const moneySaved = quitDate ? (daysSinceQuitting * (cigarettesPerDay / packSize) * packPrice) : 0;
  const cigarettesAvoided = quitDate ? daysSinceQuitting * cigarettesPerDay : 0;

  const stats = {
    daysSinceQuitting,
    moneySaved,
    cigarettesAvoided,
  };

  const aiInput = {
    daysSinceQuitting,
    cigarettesPerDayBeforeQuitting: cigarettesPerDay,
    yearsSmoking: yearsSmoked,
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6 p-4">
      <Header onReset={onReset} userData={userData} user={user} />
      <div className="flex flex-col gap-6">
        <MountainScene userData={userData} daysSinceQuitting={daysSinceQuitting} debugHour={debugHour}/>
        <MotivationalCard daysSinceQuitting={daysSinceQuitting} />
        <StatsCards stats={stats} />
        <MilestoneBadges daysSinceQuitting={daysSinceQuitting} />
        <RecoveryStats input={aiInput} />
        <DebugControls onAddDay={onAddDay} onRemoveDay={onRemoveDay} onHourChange={onHourChange} onRelapse={onRelapse} />
      </div>
    </div>
  );
}
