import { z } from 'zod';

export type UserData = {
  quitDate: string; // ISO string
  cigarettesPerDay: number;
  yearsSmoked: number;
  packPrice: number;
  packSize: number;
  name: string;
  age: number;
  avatarUrl?: string;
};

export type Milestone = {
  days: number;
  name: string;
  description: string;
  icon: React.ElementType;
};
