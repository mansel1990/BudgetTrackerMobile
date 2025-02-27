import React, { createContext, useState, useEffect, useContext } from "react";
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase";

// Define the type for your context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null; // Add an error state
  signOut: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signOut: async () => Promise.resolve(),
});

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth as any,
      (user) => {
        setUser(user);
        setLoading(false);
        setError(null); // Clear any previous errors
      },
      (error) => {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message); // Set the error message
        } else {
          setError("An unexpected error occurred."); // Handle non-Error types
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      await firebaseSignOut(auth as any);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
