import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import { auth } from "@/firebase";

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const { user } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "491011553709-b2h1du6dt547u0acmou4oppr3tfk218j.apps.googleusercontent.com",
    webClientId:
      "491011553709-6ki02d8h87kimv9df2irvvi3mnmlnl0p.apps.googleusercontent.com",
    responseType: "id_token",
    scopes: ["profile", "email"],
    extraParams: {
      access_type: "offline",
      prompt: "consent",
    },
    redirectUri: makeRedirectUri({
      native: "shop.enkasu.budgettracker://oauth2redirect",
    }),
  });

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      setLoading(true);
      const result = await promptAsync();
      console.log("Auth result:", result);

      if (result?.type === "success") {
        const credential = GoogleAuthProvider.credential(
          result.authentication?.idToken,
          result.authentication?.accessToken
        );
        await signInWithCredential(auth, credential);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message as unknown as null);
      } else {
        setError("An unknown error occurred" as unknown as null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Image
                source={require("@/assets/logo.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.title}>Budget Tracker</Text>
            <Text style={styles.subtitle}>Manage your finances with ease</Text>
          </View>
          {user ? (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.emailText}>{user.email}</Text>
            </View>
          ) : (
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Get Started</Text>
              {loading ? (
                <Text>Signing in...</Text> // Display a loading indicator
              ) : error ? (
                <Text style={{ color: "red" }}>{error}</Text> // Display error message
              ) : (
                <GoogleSignInButton onPress={handleGoogleSignIn} />
              )}
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    paddingTop: Dimensions.get("window").height * 0.12,
  },
  signInContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  welcomeContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
  },
  signInText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  welcomeText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "600",
  },
  emailText: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 10,
    opacity: 0.9,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 40,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    opacity: 0.8,
    marginTop: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
});
