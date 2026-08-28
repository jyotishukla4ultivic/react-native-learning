import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, signup, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (isLoginMode) {
      if (!email || !password) return;
      const success = await login(email, password);
      if (success) router.replace('/home');
    } else {
      if (!name || !email || !password) return;
      const success = await signup(name, email, password);
      if (success) {
        // Switch to login mode after successful signup
        setIsLoginMode(true);
      }
    }
  };

  // If already logged in
  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.card}>
          <Text style={styles.eyebrow}>WELCOME BACK</Text>
          <Text style={styles.title}>{user.name || user.email}</Text>
          <Text style={styles.subtitle}>You are currently logged in as {user.role}.</Text>
          
          <TouchableOpacity 
            style={[styles.btnGold, { marginTop: 20 }]} 
            onPress={() => router.replace('/home')}
          >
            <Text style={styles.btnGoldText}>Go to Dashboard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.btnOutline, { marginTop: 15 }]} 
            onPress={logout}
          >
            <Text style={styles.btnOutlineText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.eyebrow}>
            {isLoginMode ? 'WELCOME BACK' : 'JOIN THE CLUB'}
          </Text>
          <Text style={styles.title}>
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </Text>
          <View style={styles.divider} />

          {!isLoginMode && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#7d715c"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#7d715c"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7d715c"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.btnGold} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#0a0705" />
            ) : (
              <Text style={styles.btnGoldText}>
                {isLoginMode ? 'Sign In' : 'Sign Up'} →
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchMode} 
            onPress={() => setIsLoginMode(!isLoginMode)}
          >
            <Text style={styles.switchModeText}>
              {isLoginMode 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0705',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 60,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  backButtonText: {
    color: '#c9a24a',
    fontSize: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#0a0705',
    borderWidth: 1,
    borderColor: 'rgba(201,162,74,0.25)',
    borderRadius: 999,
    padding: 16,
    color: '#f4ecdc',
    marginBottom: 16,
    fontSize: 16,
  },
  btnGold: {
    width: '100%',
    backgroundColor: '#c9a24a',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  btnGoldText: {
    color: '#221708',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnOutline: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#c9a24a',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnOutlineText: {
    color: '#c9a24a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  eyebrow: {
    color: '#c9a24a',
    fontSize: 12,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  switchMode: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchModeText: {
    color: '#c9a24a',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(201,162,74,0.1)',
    marginBottom: 20,
  },
});
