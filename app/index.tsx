import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useAuth } from '@/context/AuthContext';

export default function SignInScreen() {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('@/assets/logo.png')}
                    style={styles.icon}
                />
                <Text style={styles.title}>Budget Tracker</Text>
            </View>
            {user ? (
                <Text style={styles.welcomeText}>Welcome, {user.email}!</Text>
            ) : (
                <>
                    <Text style={styles.signInText}>Please sign in:</Text>
                    <GoogleSignInButton />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        padding: 30, //Increased the padding
        paddingTop: Dimensions.get('window').height * 0.10, // Changed to 10% of the screen
        borderRadius: 20, // Added border radius
    },
    signInText: {
        color: '#3498db',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40, //Increased the margin bottom
        textAlign: 'center',
    },
    welcomeText: {
        color: '#3498db',
        fontSize: 30, //Increased the font size
        marginBottom: 40, //Increased the margin bottom
    },
    header: {
        alignItems: 'center',
        marginBottom: 40, //Increased the margin bottom
    },
    title: {
        fontSize: 36, //Increased the font size
        color: '#3498db',
        fontWeight: 'bold',
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});
