'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Bug, Clock, RefreshCw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface DebugControlsProps {
  onAddDay: () => void;
  onRemoveDay: () => void;
  onHourChange: (hour: number) => void;
  onRelapse: () => void;
}

export function DebugControls({ onAddDay, onRemoveDay, onHourChange, onRelapse }: DebugControlsProps) {
    const [hour, setHour] = useState(new Date().getHours());

    const handleSliderChange = (value: number[]) => {
        const newHour = value[0];
        setHour(newHour);
        onHourChange(newHour);
    };

  return (
    <Card className="border-dashed border-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5 text-accent" />
          Debug Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button onClick={onAddDay} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Day
            </Button>
            <Button onClick={onRemoveDay} variant="outline" className="w-full">
            <Minus className="mr-2 h-4 w-4" /> Remove Day
            </Button>
        </div>
         <Button onClick={onRelapse} variant="destructive" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Relapse (Reset to Day 0)
        </Button>
        <div className="space-y-3">
            <div className='flex items-center gap-2'>
                <Clock className="h-5 w-5 text-accent" />
                <CardDescription>Time of Day: {hour}:00</CardDescription>
            </div>
            <Slider
                defaultValue={[hour]}
                max={23}
                step={1}
                onValueChange={handleSliderChange}
            />
        </div>
      </CardContent>
    </Card>
  );
}
