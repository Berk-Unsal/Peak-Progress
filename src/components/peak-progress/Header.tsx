'use client';

import { Mountain, RotateCcw, LogOut, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { signOut } from '@/lib/auth/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserData } from '@/lib/types';
import type { User } from 'firebase/auth';
import { Calendar } from '../ui/calendar';
import { parseISO, format, isBefore, startOfToday } from 'date-fns';

export function Header({ onReset, userData, user }: { onReset: () => void; userData: UserData; user: User | null }) {
  const auth = useAuth();
  
  const handleSignOut = async () => {
    await signOut(auth);
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  const quitDate = userData?.quitDate ? parseISO(userData.quitDate) : new Date();
  const today = startOfToday();

  const completedDays = {
    from: quitDate,
    to: today,
  };

  const completedModifier = {
    completed: completedDays,
    today
  };

  return (
    <header className="w-full flex items-center justify-between p-4 bg-card/50 rounded-xl shadow-md">
      <div className="flex items-center gap-3">
        <Mountain className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-primary-foreground/90">
          Peak Progress
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Show Quit Date">
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={quitDate}
              defaultMonth={quitDate}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              captionLayout="dropdown-buttons"
              fromYear={2015}
              toYear={new Date().getFullYear()}
              footer={`Your journey started on: ${format(quitDate, 'PPP')}`}
              modifiers={completedModifier}
              modifiersClassNames={{ completed: "day-completed" }}
            />
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="icon" onClick={onReset} aria-label="Reset Progress">
          <RotateCcw className="h-5 w-5" />
        </Button>

        {user && (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                  <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
