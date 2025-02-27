import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import AppHeader from "@/components/AppHeader";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          header: () => <AppHeader />,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="transactions" />
        <Stack.Screen name="manage" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
