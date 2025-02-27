import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextProps {
  user: User | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: async () => Promise.resolve(),
  isLoading: true,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update your auth state listener to include loading state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut: auth.signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
