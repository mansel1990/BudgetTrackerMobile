import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { useRouter, usePathname } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const navigationItems = [
  { label: "Dashboard", icon: "home-outline", path: "/(tabs)" },
  { label: "Transactions", icon: "list-outline", path: "/(tabs)/transactions" },
  { label: "Manage", icon: "settings-outline", path: "/(tabs)/manage" },
];

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons name="menu-outline" size={28} color="#1a1a1a" />
            </TouchableOpacity>
            <Text style={styles.title}>Budget Tracker</Text>
            <TouchableOpacity onPress={signOut}>
              <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={isMenuOpen}
        transparent
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <Animated.View
            style={[
              styles.menuContainer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.userName}>{user?.displayName}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>

            {navigationItems.map((item) => (
              <TouchableOpacity
                key={item.path}
                style={[
                  styles.menuItem,
                  pathname === item.path && styles.activeMenuItem,
                ]}
                onPress={() => {
                  router.push(item.path as any);
                  toggleMenu();
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={pathname === item.path ? "#3498db" : "#64748b"}
                />
                <Text
                  style={[
                    styles.menuText,
                    pathname === item.path && styles.activeMenuText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
  menuHeader: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  userEmail: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
  },
  activeMenuItem: {
    backgroundColor: "#ebf5ff",
  },
  menuText: {
    fontSize: 16,
    color: "#64748b",
    marginLeft: 15,
  },
  activeMenuText: {
    color: "#3498db",
    fontWeight: "600",
  },
});
