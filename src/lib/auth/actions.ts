'use client';
import { Auth, GoogleAuthProvider, signInWithRedirect, OAuthProvider, getRedirectResult, signOut as firebaseSignOut, UserCredential, User } from 'firebase/auth';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export async function signInWithGoogle(auth: Auth) {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Error starting sign in with Google:', error);
    return { success: false, error: 'Failed to start sign in with Google.' };
  }
}

export async function signInWithApple(auth: Auth) {
  const provider = new OAuthProvider('apple.com');
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Error starting sign in with Apple:', error);
    return { success: false, error: 'Failed to start sign in with Apple.' };
  }
}

export async function signOut(auth: Auth) {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export function useRedirectResult(auth: Auth): { isRedirecting: boolean } {
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        // We only care about knowing when this process is over.
        // The user state will be picked up by the onAuthStateChanged listener.
        await getRedirectResult(auth);
      } catch (error) {
        console.error('Error getting redirect result:', error);
      } finally {
        setIsRedirecting(false);
      }
    };

    checkRedirect();
  }, [auth]);

  return { isRedirecting };
}
