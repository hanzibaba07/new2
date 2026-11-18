import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Switch, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, useTheme } from '../../context/Providers';

export default function ProfileScreen() {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [roastPushes, setRoastPushes] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Demo', 'Account deletion simulated') },
      ]
    );
  };

  const stats = [
    { label: 'Member Since', value: 'Jan 2025', icon: 'calendar' },
    { label: 'Total Visits', value: '89', icon: 'fitness' },
    { label: 'Current Streak', value: '7 days', icon: 'flame' },
    { label: 'Longest Streak', value: '21 days', icon: 'trophy' },
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    profileCard: {
      margin: 20,
      marginTop: 10,
      padding: 24,
      borderRadius: 20,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#00FF66',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#121212',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#666666',
      marginBottom: 12,
    },
    membershipBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: isDark ? '#333333' : '#F0F0F0',
    },
    membershipText: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#00FF66',
      marginLeft: 6,
    },
    section: {
      paddingHorizontal: 20,
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 16,
    },
    statCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statIcon: {
      marginRight: 16,
    },
    statInfo: {
      flex: 1,
    },
    statLabel: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#666666',
      marginBottom: 2,
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    settingCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settingInfo: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 4,
    },
    settingDesc: {
      fontSize: 13,
      color: isDark ? '#AAAAAA' : '#666666',
    },
    actionCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    actionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionIcon: {
      marginRight: 16,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    actionSubtitle: {
      fontSize: 13,
      color: isDark ? '#AAAAAA' : '#666666',
      marginTop: 2,
    },
    dangerCard: {
      backgroundColor: '#2A1A1A',
      borderColor: '#FF4444',
    },
    dangerTitle: {
      color: '#FF4444',
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      color: isDark ? '#666666' : '#999999',
      paddingTop: 20,
      paddingBottom: 40,
    },
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Member Name'}</Text>
        <Text style={styles.email}>{user?.email || 'member@example.com'}</Text>
        <View style={styles.membershipBadge}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.membershipText}>
            {user?.membershipType === 'premium' ? 'Premium Member' : 'Standard Member'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statCard}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <View style={styles.statLeft}>
                <Ionicons name={stat.icon} size={24} color="#00FF66" style={styles.statIcon} />
                <View style={styles.statInfo}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDesc}>Receive workout reminders and updates</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              thumbColor={notifications ? '#00FF66' : '#888888'}
              trackColor={{ false: '#333333', true: 'rgba(0, 255, 102, 0.3)' }}
            />
          </View>
        </View>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>AI Roast/Nudge Pushes</Text>
              <Text style={styles.settingDesc}>Fun motivational messages when you miss sessions (Enhanced feature)</Text>
            </View>
            <Switch
              value={roastPushes}
              onValueChange={setRoastPushes}
              thumbColor={roastPushes ? '#00FF66' : '#888888'}
              trackColor={{ false: '#333333', true: 'rgba(0, 255, 102, 0.3)' }}
            />
          </View>
        </View>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDesc}>Use dark theme throughout the app</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? '#00FF66' : '#888888'}
              trackColor={{ false: '#333333', true: 'rgba(0, 255, 102, 0.3)' }}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.actionCard} onPress={() => alert('Edit Profile - Demo')}>
          <View style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <Ionicons name="person" size={24} color="#00FF66" style={styles.actionIcon} />
              <View>
                <Text style={styles.actionTitle}>Edit Profile</Text>
                <Text style={styles.actionSubtitle}>Update name, email, and preferences</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#888888" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => alert('Change Branch - Demo')}>
          <View style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <Ionicons name="location" size={24} color="#00AAFF" style={styles.actionIcon} />
              <View>
                <Text style={styles.actionTitle}>Change Home Branch</Text>
                <Text style={styles.actionSubtitle}>Currently: {user?.branch || 'London Central'}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#888888" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => alert('Upgrade Membership - Demo')}>
          <View style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <Ionicons name="star" size={24} color="#FFD700" style={styles.actionIcon} />
              <View>
                <Text style={styles.actionTitle}>Manage Membership</Text>
                <Text style={styles.actionSubtitle}>
                  {user?.membershipType === 'premium' ? 'Premium Active' : 'Upgrade to Premium'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#888888" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => alert('Privacy & Data - Demo')}>
          <View style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <Ionicons name="shield" size={24} color="#88CC00" style={styles.actionIcon} />
              <View>
                <Text style={styles.actionTitle}>Privacy & Data</Text>
                <Text style={styles.actionSubtitle}>GDPR rights, data export, retention</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#888888" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, styles.dangerCard]} onPress={handleDeleteAccount}>
          <View style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <Ionicons name="trash" size={24} color="#FF4444" style={styles.actionIcon} />
              <View>
                <Text style={[styles.actionTitle, styles.dangerTitle]}>Delete Account</Text>
                <Text style={styles.actionSubtitle}>Permanently remove all your data</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.actionCard} onPress={handleLogout}>
          <View style={styles.actionRow}>
            <View style={styles.actionLeft}>
              <Ionicons name="log-out" size={24} color="#FF4444" style={styles.actionIcon} />
              <View>
                <Text style={[styles.actionTitle, { color: '#FF4444' }]}>Sign Out</Text>
                <Text style={styles.actionSubtitle}>End your current session</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>
        Fat 2 Fit v1.0.0 (Demo) • Student Project • BSc Computer Science
      </Text>
    </ScrollView>
  );
}