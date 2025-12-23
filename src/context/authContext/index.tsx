import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/* ---------- Types ---------- */

interface UserProfile {
  uid: string;
  email: string | null;
  name?: string;
  role?: string;
  photoURL?: string;
  createdAt?: any;
}

interface AuthContextType {
  firebaseUser: User | null;      // raw Firebase user
  currentUser: UserProfile | null; // app-level user profile
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  loading: boolean;
}

/* ---------- Context ---------- */

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/* ---------- Provider ---------- */

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: User | null) {
    setLoading(true);

    if (!user) {
      setFirebaseUser(null);
      setCurrentUser(null);
      setUserLoggedIn(false);
      setIsEmailUser(false);
      setIsGoogleUser(false);
      setLoading(false);
      return;
    }

    setFirebaseUser(user);

    // 🔐 Provider checks (your existing logic)
    setIsEmailUser(
      user.providerData.some((p) => p.providerId === "password")
    );
    setIsGoogleUser(
      user.providerData.some((p) => p.providerId === "google.com")
    );

    setUserLoggedIn(true);

    // 🔥 Fetch user profile from Firestore
    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          ...(snap.data() as any),
        });
      } else {
        // fallback if profile does not exist
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL ?? undefined,
        });
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setCurrentUser({
        uid: user.uid,
        email: user.email,
      });
    }

    setLoading(false);
  }

  const value: AuthContextType = {
    firebaseUser,
    currentUser,
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
