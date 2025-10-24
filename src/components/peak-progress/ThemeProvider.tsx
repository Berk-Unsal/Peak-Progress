'use client';

import { useEffect } from 'react';

// This provider originally handled theme changes, but now it's simplified.
// It can be used for other global theme-related logic in the future.
export function ThemeProvider({ children }: { children: React.ReactNode; debugHour: number | null }) {
  useEffect(() => {
    // We can add logic here to set a default theme if needed, but we will no longer
    // automatically switch between light/dark based on the time of day globally.
    // The MountainScene now handles its own theme.

    // Example: Ensure light mode is the default if no preference is set.
    // document.documentElement.classList.remove('dark');

  }, []);

  return <>{children}</>;
}
