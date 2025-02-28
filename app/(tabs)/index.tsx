import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { differenceInDays } from "date-fns";
import { getBalanceStats } from "@/api/transactions";
import { router } from "expo-router";

const MAX_DATE_RANGE_DAYS = 90;

export default function HomeScreen() {
  const { user } = useAuth();

  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  const [isFromPickerVisible, setFromPickerVisible] = useState(false);
  const [isToPickerVisible, setToPickerVisible] = useState(false);

  const formattedFrom = dateRange.from.toISOString().split("T")[0];
  const formattedTo = dateRange.to.toISOString().split("T")[0];

  const { data: balanceStats, isLoading } = getBalanceStats(
    formattedFrom,
    formattedTo
  );

  // Add date picker handlers
  const handleFromConfirm = (date: Date) => {
    if (differenceInDays(dateRange.to, date) > MAX_DATE_RANGE_DAYS) {
      alert(`Date range must be less than ${MAX_DATE_RANGE_DAYS} days!`);
      return;
    }
    setDateRange((prev) => ({ ...prev, from: date }));
    setFromPickerVisible(false);
  };

  const handleToConfirm = (date: Date) => {
    if (differenceInDays(date, dateRange.from) > MAX_DATE_RANGE_DAYS) {
      alert(`Date range must be less than ${MAX_DATE_RANGE_DAYS} days!`);
      return;
    }
    setDateRange((prev) => ({ ...prev, to: date }));
    setToPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, Mansel Family</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.incomeButton]}
            onPress={() => router.push("/(tabs)/transactions/new?type=income")}
          >
            <Text style={styles.actionButtonText}>New Income 🤑</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.expenseButton]}
            onPress={() => router.push("/(tabs)/transactions/new?type=expense")}
          >
            <Text style={styles.actionButtonText}>New Expense 💸</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Overview</Text>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              console.log("Opening From Picker");
              setFromPickerVisible(true);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.dateButtonText}>
              {dateRange.from.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <Text style={styles.dateSeperator}>-</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setToPickerVisible(true)}
          >
            <Text style={styles.dateButtonText}>
              {dateRange.to.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DatePickerModal
        mode="single"
        locale="en"
        visible={isFromPickerVisible}
        onDismiss={() => setFromPickerVisible(false)}
        date={dateRange.from}
        onConfirm={(params) => {
          params.date && handleFromConfirm(params.date);
        }}
        validRange={{
          startDate: undefined,
          endDate: dateRange.to,
        }}
      />
      <DatePickerModal
        mode="single"
        locale="in"
        visible={isToPickerVisible}
        onDismiss={() => setToPickerVisible(false)}
        date={dateRange.to}
        onConfirm={(params) => {
          params.date && handleToConfirm(params.date);
        }}
        validRange={{
          startDate: dateRange.from,
          endDate: new Date(),
        }}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={[styles.statAmount, styles.incomeText]}>
              ${balanceStats?.income || 0}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Expense</Text>
            <Text style={[styles.statAmount, styles.expenseText]}>
              ${balanceStats?.expense || 0}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={[styles.statAmount, styles.balanceText]}>
              ${(balanceStats?.income || 0) - (balanceStats?.expense || 0)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  incomeButton: {
    backgroundColor: Colors.success + "20",
    borderColor: Colors.success,
  },
  expenseButton: {
    backgroundColor: Colors.danger + "20",
    borderColor: Colors.danger,
  },
  actionButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  statsContainer: {
    width: "100%",
    padding: 20,
    gap: 15,
    marginTop: 0,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.text.primary,
    opacity: 0.7,
  },
  balanceText: {
    color: Colors.primary,
  },
  statCard: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  incomeText: {
    color: Colors.success,
  },
  expenseText: {
    color: Colors.danger,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  header: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "column",
    gap: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateButton: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateButtonText: {
    color: Colors.text.primary,
    fontSize: 14,
  },
  dateSeperator: {
    color: Colors.text.secondary,
    fontSize: 16,
  },
});
