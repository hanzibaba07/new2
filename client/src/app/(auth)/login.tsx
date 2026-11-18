import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, useTheme } from '../../context/Providers';

export default function LoginScreen() {
  const { isDark } = useTheme();
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    try {
      await login(email, password);
      router.replace('/(member)/dashboard');
    } catch (e) {
      setError('Login failed. Please try again.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#FFFFFF',
    },
    scrollView: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    logo: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#00FF66',
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#AAAAAA' : '#666666',
      textAlign: 'center',
      marginBottom: 40,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#CCCCCC' : '#333333',
      marginBottom: 8,
    },
    input: {
      height: 52,
      backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#121212',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#DDDDDD',
    },
    inputFocused: {
      borderColor: '#00FF66',
    },
    errorText: {
      color: '#FF4444',
      fontSize: 13,
      marginTop: 4,
      marginLeft: 4,
    },
    button: {
      height: 52,
      backgroundColor: '#00FF66',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 24,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#121212',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? '#333333' : '#DDDDDD',
    },
    dividerText: {
      paddingHorizontal: 16,
      color: isDark ? '#888888' : '#999999',
      fontSize: 14,
    },
    registerRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    registerText: {
      color: isDark ? '#AAAAAA' : '#666666',
      fontSize: 15,
    },
    registerLink: {
      color: '#00FF66',
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 4,
    },
    demoNotice: {
      marginTop: 32,
      padding: 16,
      backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#DDDDDD',
    },
    demoText: {
      fontSize: 12,
      color: isDark ? '#888888' : '#888888',
      textAlign: 'center',
      lineHeight: 18,
    },
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={styles.logo}>FAT 2 FIT</Text>
      <Text style={styles.subtitle}>Welcome back! Sign in to your account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCompleteType="password"
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Signing in...' : 'Sign In'}</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.registerRow}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Link href="/(auth)/register" as="button">
          <Text style={styles.registerLink}>Join Now</Text>
        </Link>
      </View>

      <View style={styles.demoNotice}>
        <Text style={styles.demoText}>
          <Ionicons name="information-circle" size={16} color="#00FF66" style={{marginRight: 6, verticalAlign: 'middle'}} />
          <Text style={{verticalAlign: 'middle'}}>
            Demo Mode: Any email/password works. This is a student project - no real authentication.
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}