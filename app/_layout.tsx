import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";

function RootLayoutNav() {
  const router = useRouter();

  useEffect(() => {
    // Force navigate to tabs immediately on mount
    router.push("/(tabs)");
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        retryDelay: 1000,
        staleTime: 300000,
        gcTime: 3600000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
    },
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayoutNav />
          <StatusBar style="auto" />
        </QueryClientProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
