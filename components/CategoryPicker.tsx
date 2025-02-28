import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
type TransactionType = "income" | "expense";
import { Colors } from "@/constants/Colors";
import React from "react";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Bonus", "Other"],
  expense: [
    "Shopping",
    "Daily Essentials",
    "Transport",
    "Clothing",
    "Restaurant",
    "Bills",
    "Medical",
    "Education",
    "Sports",
    "Family",
    "Trip",
    "Baby",
    "Rent",
    "One Time Expense",
  ],
};

interface Props {
  type: TransactionType;
  value?: string;
  onChange: (value: string) => void;
}

export function CategoryPicker({ type, value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {CATEGORIES[type as keyof typeof CATEGORIES].map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.category,
            value === category && styles.selectedCategory,
          ]}
          onPress={() => onChange(category)}
        >
          <Text
            style={[
              styles.categoryText,
              value === category && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    color: Colors.text.primary,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: Colors.white,
  },
});
