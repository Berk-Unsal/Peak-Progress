'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/peak-progress/Dashboard';
import { SetupForm } from '@/components/peak-progress/SetupForm';
import type { UserData } from '@/lib/types';
import { useUser, useFirestore, useMemoFirebase, useDoc, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ThemeProvider } from '@/components/peak-progress/ThemeProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { AuthScreen } from '@/components/peak-progress/AuthScreen';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { addDays, subDays, parseISO } from 'date-fns';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRedirectResult } from '@/lib/auth/actions';
import type { User } from 'firebase/auth';

const mockUser = {
  uid: 'debug-user',
  email: 'debug@example.com',
  displayName: 'Debug User',
  photoURL: 'https://picsum.photos/seed/debug/200/200',
} as User;

const mockUserData: UserData = {
  name: 'Debug User',
  age: 30,
  quitDate: new Date().toISOString(),
  cigarettesPerDay: 20,
  yearsSmoked: 10,
  packPrice: 10,
  packSize: 20,
  avatarUrl: 'https://picsum.photos/seed/debug/200/200',
};


export default function Home() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { isRedirecting } = useRedirectResult(auth);
  
  const firestore = useFirestore();
  const { toast } = useToast();
  const [debugHour, setDebugHour] = useState<number | null>(null);
  const [debugUser, setDebugUser] = useState<User | null>(null);

  const activeUser = debugUser || user;

  const userProgressDocRef = useMemoFirebase(() => {
    if (!firestore || !activeUser) return null;
    if (debugUser) return null; // Don't fetch from Firestore for debug user
    return doc(firestore, 'progress', activeUser.uid);
  }, [firestore, activeUser, debugUser]);

  const { data: userData, isLoading: isDataLoading } = useDoc<UserData>(userProgressDocRef);
  
  const finalUserData = debugUser ? mockUserData : userData;
  const isDataReallyLoading = debugUser ? false : isDataLoading;

  const handleSetupComplete = async (data: Omit<UserData, 'avatarUrl' | 'quitDate'> & { quitDate: Date }) => {
    if (!userProgressDocRef) return;
    
    const avatar = PlaceHolderImages.find(img => img.id === 'avatar');

    const dataToSave: UserData = {
      ...data,
      quitDate: data.quitDate.toISOString(),
      avatarUrl: user?.photoURL || avatar?.imageUrl || 'https://picsum.photos/seed/avatar/200/200',
    };
    
    if (!dataToSave.name && user?.displayName) {
      dataToSave.name = user.displayName;
    }
    
    setDocumentNonBlocking(userProgressDocRef, dataToSave, { merge: true });
     toast({
      title: 'Setup Complete!',
      description: "Your journey begins now.",
    });
  };

  const handleReset = () => {
    if (debugUser) {
       toast({ title: 'Debug Mode', description: 'Reset is disabled in debug mode.'});
       return;
    }
    if (window.confirm('Are you sure you want to reset your progress? This will require you to set a new quit date.')) {
      if (userProgressDocRef) {
        setDocumentNonBlocking(userProgressDocRef, { quitDate: null }, { merge: true });
         toast({
          title: 'Journey Reset',
          description: "Time to set a new quit date.",
        });
      }
    }
  };

  const handleRelapse = () => {
     if (debugUser) {
       toast({ title: 'Debug Mode', description: 'Relapse is disabled in debug mode.'});
       return;
    }
    if (window.confirm('A setback is just a setup for a comeback. Are you sure you want to reset your quit date?')) {
      if (userProgressDocRef) {
        setDocumentNonBlocking(userProgressDocRef, { quitDate: null }, { merge: true });
        toast({
          title: 'Progress Reset',
          description: "Your journey has been restarted. You've got this!",
        });
      }
    }
  };
  
  const handleAddDay = () => {
    if (userProgressDocRef && userData?.quitDate) {
      const newQuitDate = subDays(parseISO(userData.quitDate), 1);
      setDocumentNonBlocking(userProgressDocRef, { quitDate: newQuitDate.toISOString() }, { merge: true });
    }
     if (debugUser) {
      mockUserData.quitDate = subDays(parseISO(mockUserData.quitDate), 1).toISOString();
      // force re-render
      setDebugUser({...debugUser});
    }
  };

  const handleRemoveDay = () => {
    if (userProgressDocRef && userData?.quitDate) {
      const newQuitDate = addDays(parseISO(userData.quitDate), 1);
      if (newQuitDate > new Date()) {
        toast({
          variant: 'destructive',
          title: 'Cannot go into the future!',
          description: "You can't remove a day if your quit date is today.",
        });
        return;
      }
      setDocumentNonBlocking(userProgressDocRef, { quitDate: newQuitDate.toISOString() }, { merge: true });
    }
    if (debugUser) {
      mockUserData.quitDate = addDays(parseISO(mockUserData.quitDate), 1).toISOString();
      // force re-render
      setDebugUser({...debugUser});
    }
  };

  const handleHourChange = (hour: number) => {
    setDebugHour(hour);
  };

  const handleDebugLogin = () => {
    setDebugUser(mockUser);
  };


  // Show a loading skeleton while Firebase is determining the auth state or processing a redirect.
  if ((isUserLoading || isRedirecting) && !debugUser) {
    return (
       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <Skeleton className="h-[400px] w-[350px] rounded-xl" />
      </div>
    );
  }

  const renderContent = () => {
    if (!activeUser) {
      return <AuthScreen onDebugLogin={handleDebugLogin} />;
    }
    
    if (isDataReallyLoading) {
       return (
         <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
          <Skeleton className="h-[400px] w-[350px] rounded-xl" />
        </div>
      );
    }

    if (finalUserData && finalUserData.quitDate) {
      return (
        <Dashboard 
          userData={finalUserData} 
          user={activeUser}
          onReset={handleReset} 
          onAddDay={handleAddDay}
          onRemoveDay={handleRemoveDay}
          onHourChange={handleHourChange}
          onRelapse={handleRelapse}
          debugHour={debugHour}
        />
      );
    }
    return <SetupForm onSetupComplete={handleSetupComplete} existingData={finalUserData} />;
  };

  return (
    <ThemeProvider debugHour={debugHour}>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground transition-colors duration-500 p-2 sm:p-4">
        {renderContent()}
      </main>
    </ThemeProvider>
  );
}
