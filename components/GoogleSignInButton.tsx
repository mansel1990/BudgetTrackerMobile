import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import React from "react";

interface GoogleSignInButtonProps {
  onPress: () => Promise<void>;
}

export default function GoogleSignInButton({
  onPress,
}: GoogleSignInButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Image
          source={require("@/assets/google-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 240,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  text: {
    color: "#757575",
    fontSize: 16,
    fontWeight: "500",
  },
});
