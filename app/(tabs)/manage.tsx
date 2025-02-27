import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ManageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
