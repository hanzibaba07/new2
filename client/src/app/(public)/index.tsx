import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/Providers';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#FFFFFF',
    },
    scrollView: {
      flex: 1,
    },
    heroSection: {
      padding: 24,
      alignItems: 'center',
    },
    logo: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#00FF66',
      marginBottom: 8,
    },
    tagline: {
      fontSize: 18,
      color: isDark ? '#CCCCCC' : '#666666',
      textAlign: 'center',
      marginBottom: 32,
    },
    ctaButton: {
      backgroundColor: '#00FF66',
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 12,
      marginBottom: 16,
    },
    ctaText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#121212',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#00FF66',
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 12,
    },
    secondaryButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#00FF66',
    },
    section: {
      padding: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 16,
    },
    featureRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
    },
    featureCard: {
      width: 160,
      padding: 20,
      borderRadius: 16,
      backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5',
      alignItems: 'center',
    },
    featureIcon: {
      fontSize: 32,
      marginBottom: 12,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 4,
      textAlign: 'center',
    },
    featureDesc: {
      fontSize: 12,
      color: isDark ? '#AAAAAA' : '#666666',
      textAlign: 'center',
    },
    footer: {
      padding: 24,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: isDark ? '#333333' : '#EEEEEE',
    },
    footerText: {
      color: isDark ? '#888888' : '#999999',
      fontSize: 14,
    },
  });

  const features = [
    { icon: 'qr-code', title: 'QR Check-in', desc: 'Time-limited codes for secure entry' },
    { icon: 'fitness', title: 'Workout Logging', desc: 'Track your progress session by session' },
    { icon: 'people', title: 'Community', desc: 'Join groups and challenges' },
    { icon: 'trophy', title: 'Streaks & Badges', desc: 'Stay motivated with gamification' },
  ];

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.logo}>FAT 2 FIT</Text>
        <Text style={styles.tagline}>
          Smart gym platform for attendance, workout logging, and engagement.
          One account for branches, digital card, and real-time check-in.
        </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.ctaText}>Join Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.secondaryButtonText}>Member Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureRow}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Ionicons name={feature.icon} size={32} color="#00FF66" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Find Your Branch</Text>
        <View style={styles.featureRow}>
          {['London Central', 'Manchester North', 'Birmingham East', 'Glasgow West'].map((branch, index) => (
            <TouchableOpacity key={index} style={styles.featureCard} onPress={() => router.push('/(public)/branches')}>
              <Ionicons name="location" size={32} color="#00FF66" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>{branch}</Text>
              <Text style={styles.featureDesc}>View hours & sessions</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Fat 2 Fit - Student Project | BSc Computer Science</Text>
        <Text style={styles.footerText}>Not a commercial product - Demo purposes only</Text>
      </View>
    </ScrollView>
  );
}