'use client';
import { Mountain, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { signInWithGoogle, signInWithApple } from '@/lib/auth/actions';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.565-3.113-11.386-7.46l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.41,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
    <path d="M19.3,4.95A6.84,6.84,0,0,0,14.7,2.2a6.9,6.9,0,0,0-5.33,2.46,6.8,6.8,0,0,0-2,5.39,7.21,7.21,0,0,0,2.15,5.17,6.82,6.82,0,0,0,4.89,2.56,1,1,0,0,0,.28,0,6.67,6.67,0,0,0,5.2-2.58,1,1,0,0,0,.08-.13,7,7,0,0,0,2.22-5.46A6.84,6.84,0,0,0,19.3,4.95Zm-5.74,.4A4.69,4.69,0,0,1,15.82,4a4.34,4.34,0,0,1,1.21,3.22,4.42,4.42,0,0,1-1.3,3.06,4.31,4.31,0,0,1-3,.84,4.52,4.52,0,0,1-1.46-3.2A4.2,4.2,0,0,1,12.35,5,4.38,4.38,0,0,1,13.56,5.35Z" fill="currentColor"/>
    <path d="M12.31,1.25a1,1,0,0,0-1.07.9,5.1,5.1,0,0,0-1.48,4.16,1,1,0,0,0,1,1,1,1,0,0,0,1-1,3.12,3.12,0,0,1,1-2.57,1,1,0,0,0-.49-1.45Z" fill="currentColor"/>
  </svg>
);


export function AuthScreen({ onDebugLogin }: { onDebugLogin: () => void }) {
  const auth = useAuth();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle(auth);
  };

  const handleAppleSignIn = async () => {
    await signInWithApple(auth);
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl animate-in fade-in-50 zoom-in-95">
      <CardHeader className="items-center text-center">
        <Mountain className="h-12 w-12 text-primary" />
        <CardTitle className="text-3xl font-headline">Welcome to Peak Progress</CardTitle>
        <CardDescription>Sign in to save your progress and climb your mountain.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
          <GoogleIcon className="mr-2" />
          Sign in with Google
        </Button>
        <Button onClick={handleAppleSignIn} variant="outline" className="w-full">
          <AppleIcon className="mr-2" />
          Sign in with Apple
        </Button>
        {process.env.NODE_ENV === 'development' && (
          <Button onClick={onDebugLogin} variant="secondary" className="w-full">
            <Bug className="mr-2 text-accent" />
            Debug Admin
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
