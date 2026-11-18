import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/Providers';

const memberships = [
  {
    id: 'basic',
    name: 'Basic',
    price: '£29',
    period: '/month',
    description: 'Perfect for occasional gym-goers',
    features: [
      'Access to 1 selected branch',
      'QR check-in/out',
      'Workout logging',
      'Attendance history',
      'Basic workout plans',
    ],
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '£49',
    period: '/month',
    description: 'Best for regular training',
    features: [
      'Access to all branches',
      'QR check-in/out',
      'Workout logging & plans',
      'Attendance history & stats',
      'Group classes access',
      'Streaks & badges',
      'Community groups',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '£79',
    period: '/month',
    description: 'Full experience with coaching',
    features: [
      'All Standard features',
      'Personal trainer sessions (2/month)',
      'AI workout suggestions',
      'Priority class booking',
      'Guest passes (4/month)',
      'Nutrition guidance',
      'Progress analytics',
    ],
    popular: false,
  },
];

export default function MembershipsScreen() {
  const { isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#FFFFFF',
    },
    header: {
      padding: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#EEEEEE',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#666666',
      marginTop: 4,
    },
    card: {
      margin: 16,
      marginBottom: 24,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 2,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    popularCard: {
      borderColor: '#00FF66',
      borderWidth: 3,
    },
    popularBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: '#00FF66',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      zIndex: 1,
    },
    popularBadgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#121212',
    },
    cardHeader: {
      padding: 24,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#EEEEEE',
    },
    cardName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: 8,
    },
    price: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#00FF66',
    },
    period: {
      fontSize: 16,
      color: isDark ? '#AAAAAA' : '#666666',
      marginLeft: 4,
    },
    description: {
      fontSize: 14,
      color: isDark ? '#CCCCCC' : '#666666',
      marginTop: 8,
      textAlign: 'center',
    },
    featuresList: {
      padding: 24,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#F0F0F0',
    },
    featureIcon: {
      marginRight: 12,
    },
    featureText: {
      fontSize: 15,
      color: isDark ? '#FFFFFF' : '#121212',
    },
    selectButton: {
      margin: 16,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    selectButtonPrimary: {
      backgroundColor: '#00FF66',
    },
    selectButtonOutline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#00FF66',
    },
    selectButtonTextPrimary: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#121212',
    },
    selectButtonTextOutline: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00FF66',
    },
    note: {
      paddingHorizontal: 24,
      paddingBottom: 24,
      textAlign: 'center',
      fontSize: 12,
      color: isDark ? '#888888' : '#999999',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Membership Plans</Text>
        <Text style={styles.subtitle}>Choose the plan that fits your fitness journey</Text>
      </View>

      {memberships.map((plan) => (
        <View key={plan.id} style={[styles.card, plan.popular && styles.popularCard]}>
          {plan.popular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
            </View>
          )}
          <View style={styles.cardHeader}>
            <Text style={styles.cardName}>{plan.name}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.period}>{plan.period}</Text>
            </View>
            <Text style={styles.description}>{plan.description}</Text>
          </View>
          <View style={styles.featuresList}>
            {plan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={22} color="#00FF66" style={styles.featureIcon} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.selectButton,
              plan.popular ? styles.selectButtonPrimary : styles.selectButtonOutline,
            ]}
            onPress={() => alert(`Join ${plan.name} plan - This is a demo. No payment processed.`)}
          >
            <Text style={plan.popular ? styles.selectButtonTextPrimary : styles.selectButtonTextOutline}>
              {plan.popular ? 'Get Started' : 'Select Plan'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.note}>
        <Text>Note: This is a student project demo. No real payments are processed.</Text>
      </View>
    </ScrollView>
  );
}