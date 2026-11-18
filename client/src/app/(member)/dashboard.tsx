import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, useTheme } from '../../context/Providers';

export default function DashboardScreen() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const stats = [
    { label: 'This Month', value: '12', icon: 'calendar', color: '#00FF66' },
    { label: 'Current Streak', value: '7', icon: 'flame', color: '#FF4444' },
    { label: 'Total Visits', value: '89', icon: 'fitness', color: '#00AAFF' },
    { label: 'Hours Logged', value: '67.5', icon: 'time', color: '#FF8800' },
  ];

  const recentVisits = [
    { date: 'Today', time: '07:30 - 09:15', branch: 'London Central', duration: '1h 45m' },
    { date: 'Yesterday', time: '18:00 - 19:30', branch: 'London Central', duration: '1h 30m' },
    { date: 'Dec 14', time: '07:00 - 08:30', branch: 'Manchester North', duration: '1h 30m' },
    { date: 'Dec 12', time: '12:30 - 14:00', branch: 'London Central', duration: '1h 30m' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#FFFFFF',
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#EEEEEE',
    },
    greeting: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    branch: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#666666',
      marginTop: 4,
    },
    statsContainer: {
      padding: 16,
      paddingBottom: 8,
    },
    statCard: {
      flex: 1,
      marginHorizontal: 8,
      padding: 20,
      borderRadius: 16,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
      alignItems: 'center',
    },
    statIcon: {
      fontSize: 28,
      marginBottom: 8,
    },
    statValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? '#AAAAAA' : '#666666',
      textAlign: 'center',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      marginTop: 24,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    seeAllText: {
      color: '#00FF66',
      fontSize: 14,
      fontWeight: '600',
    },
    visitCard: {
      marginHorizontal: 16,
      marginBottom: 12,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    visitInfo: {
      flex: 1,
    },
    visitDate: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 4,
    },
    visitTime: {
      fontSize: 13,
      color: isDark ? '#AAAAAA' : '#666666',
      marginBottom: 2,
    },
    visitBranch: {
      fontSize: 13,
      color: '#00FF66',
      fontWeight: '600',
    },
    visitDuration: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      textAlign: 'right',
    },
    quickActions: {
      padding: 24,
      paddingBottom: 40,
    },
    actionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    actionCard: {
      width: '48%',
      marginBottom: 16,
      padding: 20,
      borderRadius: 16,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
      alignItems: 'center',
    },
    actionIcon: {
      fontSize: 32,
      marginBottom: 12,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      textAlign: 'center',
    },
  });

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00FF66']} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.name || 'Member'}!</Text>
        <Text style={styles.branch}>
          <Ionicons name="location" size={16} color="#00FF66" style={{marginRight: 4}} />
          {user?.branch || 'London Central'} • {user?.membershipType === 'premium' ? 'Premium' : 'Standard'} Member
        </Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Ionicons name={stat.icon} size={28} color={stat.color} style={styles.statIcon} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Visits</Text>
        <TouchableOpacity onPress={() => alert('Full history - Demo')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {recentVisits.map((visit, index) => (
        <View key={index} style={styles.visitCard}>
          <View style={styles.visitInfo}>
            <Text style={styles.visitDate}>{visit.date}</Text>
            <Text style={styles.visitTime}>{visit.time}</Text>
            <Text style={styles.visitBranch}>
              <Ionicons name="location" size={14} color="#00FF66" style={{marginRight: 4}} />
              {visit.branch}
            </Text>
          </View>
          <Text style={styles.visitDuration}>{visit.duration}</Text>
        </View>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>

      <View style={styles.quickActions}>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => alert('QR Scanner - Demo')}>
            <Ionicons name="qr-code" size={32} color="#00FF66" style={styles.actionIcon} />
            <Text style={styles.actionTitle}>Check In / Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => alert('Workout Logger - Demo')}>
            <Ionicons name="fitness" size={32} color="#00AAFF" style={styles.actionIcon} />
            <Text style={styles.actionTitle}>Log Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => alert('Digital Card - Demo')}>
            <Ionicons name="card" size={32} color="#FF8800" style={styles.actionIcon} />
            <Text style={styles.actionTitle}>View My Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => alert('Streaks & Badges - Demo')}>
            <Ionicons name="trophy" size={32} color="#FFD700" style={styles.actionIcon} />
            <Text style={styles.actionTitle}>My Progress</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}