import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { DatePickerModal } from "react-native-paper-dates";
import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryPicker } from "@/components/CategoryPicker";
import { createTransaction } from "@/api/transactions";

const QUICK_FILL_OPTIONS = [
  { emoji: "🛍️", desc: "Amazon", category: "Shopping" },
  { emoji: "🥦", desc: "Zepto", category: "Daily Essentials" },
  { emoji: "👕", desc: "Dress", category: "Clothing" },
  { emoji: "👨‍👩‍👧", desc: "Sent money to family", category: "Family" },
  { emoji: "🏏", desc: "Cricket / Badminton", category: "Sports" },
  { emoji: "⛽", desc: "Petrol", category: "Transport" },
  { emoji: "🍔", desc: "Eating out/Ordered food", category: "Restaurant" },
  { emoji: "🧸", desc: "Baby toys or needs", category: "Baby" },
  { emoji: "🛩️", desc: "Outing", category: "Trip" },
  { emoji: "💡", desc: "Electricity Bill", category: "Bills" },
  { emoji: "💸", desc: "One-time expense", category: "One Time Expense" },
  { emoji: "🏠", desc: "Monthly rent payment", category: "Rent" },
  { emoji: "🏥", desc: "Doctor visit / Medicines", category: "Medical" },
  { emoji: "📚", desc: "School / Online Courses", category: "Education" },
];
export default function NewTransactionScreen() {
  const { type } = useLocalSearchParams<{ type: "income" | "expense" }>();
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const handleQuickFill = (desc: string, category: string) => {
    setDescription(desc);
    setCategory(category);
  };

  const { mutate: createNewTransaction, isPending } = createTransaction();
  const handleSubmit = () => {
    if (!amount || !category) {
      alert("Please fill in all required fields");
      return;
    }

    createNewTransaction(
      {
        amount: Number(amount),
        description,
        date,
        category,
        type,
      },
      {
        onSuccess: () => {
          alert("Transaction created successfully!");
          router.push("/");
        },
        onError: (error) => {
          alert("Failed to create transaction");
        },
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.backButton}
        >
          <View style={styles.backButtonContainer}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New {type} Transaction</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            style={styles.input}
            placeholder="Enter description"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChange={(e) => {
              const numericValue = e.nativeEvent.text.replace(/[^0-9]/g, "");
              setAmount(numericValue);
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <Button onPress={() => setDatePickerVisible(true)} variant="outline">
            {date.toLocaleDateString()}
          </Button>
        </View>

        <DatePickerModal
          locale="en"
          mode="single"
          visible={isDatePickerVisible}
          onDismiss={() => setDatePickerVisible(false)}
          date={date}
          onConfirm={({ date }) => {
            setDate(date || new Date());
            setDatePickerVisible(false);
          }}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            <CategoryPicker
              type={type}
              value={category}
              onChange={setCategory}
            />
          </View>
        </View>

        {type === "expense" && (
          <View style={styles.quickFillSection}>
            <Text style={styles.label}>Quick Fill</Text>
            <View style={styles.quickFillGrid}>
              {QUICK_FILL_OPTIONS.map(({ emoji, desc, category }) => (
                <TouchableOpacity
                  key={desc}
                  onPress={() => handleQuickFill(desc, category)}
                  style={styles.quickFillButton}
                >
                  <Text style={styles.quickFillEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <Button
          onPress={handleSubmit}
          style={[
            styles.submitButton,
            {
              backgroundColor:
                type === "income" ? Colors.success : Colors.danger,
            },
          ]}
        >
          {isPending ? "Creating..." : `Create ${type}`}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  categoryContainer: {
    marginVertical: 8,
  },
  quickFillSection: {
    marginTop: 16,
  },
  quickFillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  quickFillButton: {
    width: "18%",
    aspectRatio: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  submitButton: {
    marginTop: 20,
  },
  quickFillContainer: {
    marginVertical: 10,
  },
  quickFillEmoji: {
    fontSize: 24,
  },
});
