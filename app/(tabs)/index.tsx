import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in"); // Updated navigation path
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Home Page</Text>
      <Text style={styles.emailText}>{user?.displayName}</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 30,
  },
  signOutButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },
  signOutText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
