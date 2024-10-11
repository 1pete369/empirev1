import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from '../firebase/config';
import { FirebaseError } from 'firebase/app';

// Define the type for the unified user object
type FirebaseUserObject = {
  uid: string;
  email: string;
  displayName?: string;
  username?: string;
  photoURL?: string;
  provider: 'google' | 'email';
  isEmailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  customData?: {
    preferences?: any;
    streak?: number;
    goals?: string[];
  };
};

// Context to provide user data globally
type UserContextType = {
  user: FirebaseUserObject | null;
  error: string | null;
  handleGoogleLogin: () => Promise<void>;
  handleEmailLogin: (email: string, password: string) => Promise<void>;
  handleEmailSignup: (email: string, password: string, username: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

const mapFirebaseUserToUserObject = (user: FirebaseUser, username?: string): FirebaseUserObject => {
  return {
    uid: user.uid,
    email: user.email ?? '',
    displayName: user.displayName || '',
    username: username || (user.displayName ? user.displayName.replace(/\s+/g, '') : ''),
    photoURL: user.photoURL || '',
    provider: user.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
    isEmailVerified: user.emailVerified,
    createdAt: new Date(user.metadata.creationTime || ''),
    lastLoginAt: new Date(user.metadata.lastSignInTime || ''),
    customData: {},
  };
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUserObject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      setUser(mapFirebaseUserToUserObject(firebaseUser));
      setError(null);
    } catch (err: unknown) {
      console.error("Google login error:", err);
      setError('An unexpected error occurred during Google login.');
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      setUser(mapFirebaseUserToUserObject(firebaseUser));
      setError(null);
    } catch (err: unknown) {
      console.error("Email login error:", err);
      if (err instanceof FirebaseError) {
        setError('Invalid email/password');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailSignup = async (email: string, password: string, username: string) => {
    if (!isValidEmail(email)) {
      setError('Invalid email format. Please check and try again.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      await updateProfile(firebaseUser, {
        displayName: username,
      });

      setUser(mapFirebaseUserToUserObject(firebaseUser, username));
      setError(null);
    } catch (err: unknown) {
      console.error('Signup error:', err);
      if (err instanceof FirebaseError) {
        switch(err.code){
          case "auth/email-already-in-use":
            setError("Email already exists!");
            break;
          default:
            setError(err.message || "Signup failed. Please try again.");
            break;
        }
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (err: unknown) {
      setError("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUserToUserObject(firebaseUser));
        setError(null);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      error,
      handleGoogleLogin,
      handleEmailLogin,
      handleEmailSignup,
      handleLogout,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
