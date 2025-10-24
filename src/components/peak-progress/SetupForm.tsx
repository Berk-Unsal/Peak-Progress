'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { UserData } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  age: z.coerce.number().min(1, 'Please enter your age.'),
  quitDate: z.date({
    required_error: 'Please select the date you quit smoking.',
  }),
  cigarettesPerDay: z.coerce.number().min(1, 'Must be at least 1.'),
  yearsSmoked: z.coerce.number().min(0, 'Cannot be negative.'),
  packPrice: z.coerce.number().min(0, 'Cannot be negative.'),
  packSize: z.coerce.number().min(1, 'A pack must contain at least 1 cigarette.'),
});

type FormValues = z.infer<typeof formSchema>;

interface SetupFormProps {
  onSetupComplete: (data: Omit<FormValues, 'preferredAnimal'>) => void;
  existingData?: Omit<UserData, 'preferredAnimal'> | null;
}

export function SetupForm({ onSetupComplete, existingData }: SetupFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingData?.name || '',
      age: existingData?.age || undefined,
      cigarettesPerDay: existingData?.cigarettesPerDay || 10,
      yearsSmoked: existingData?.yearsSmoked || 5,
      packPrice: existingData?.packPrice || 10,
      packSize: existingData?.packSize || 20,
    },
  });

  function onSubmit(values: FormValues) {
    onSetupComplete(values);
  }

  const title = existingData?.name ? `Welcome Back, ${existingData.name}` : 'Welcome to Peak Progress';
  const description = existingData?.name ? 'A setback is just a setup for a comeback. Set your new quit date to begin the climb again.' : 'Start your journey to a smoke-free life. Tell us a bit about yourself to personalize your climb.';
  const buttonText = existingData?.name ? 'Start My Climb Again' : 'Start My Climb';

  return (
    <Card className="w-full max-w-lg shadow-2xl animate-in fade-in-50 zoom-in-95">
      <CardHeader className="items-center text-center">
        <Mountain className="h-12 w-12 text-primary" />
        <CardTitle className="text-3xl font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alex" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quitDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Quit Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="cigarettesPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cigarettes / day</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="yearsSmoked"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years Smoked</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="packSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cigarettes per pack</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="packPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per pack ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="e.g., 8.50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg">{buttonText}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
