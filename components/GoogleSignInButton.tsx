import { StyleSheet, View, Button } from 'react-native';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import React from 'react';

export default function GoogleSignInButton() {

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            // Redirect to the app or dashboard after successful login
        } catch (error) {
            console.error("Google Sign In Error:", error);
        }
    };
    return (
        <View style={styles.container}>
            <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#eee', // Light gray background
    },
    button: {
        // You can add more specific button styles here if needed
    },
});