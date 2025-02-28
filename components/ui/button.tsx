import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export function Button({
  children,
  variant = "default",
  style,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "outline" && styles.outlineButton,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, variant === "outline" && styles.outlineText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  outlineText: {
    color: Colors.text.primary,
  },
});
