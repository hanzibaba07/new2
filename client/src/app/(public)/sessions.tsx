import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/Providers';

const sessionTypes = [
  { name: 'HIIT', icon: 'flash', color: '#FF4444', duration: '30 min', level: 'High', calories: '300-400' },
  { name: 'Spin', icon: 'bicycle', color: '#00AAFF', duration: '45 min', level: 'Medium', calories: '400-600' },
  { name: 'Yoga', icon: 'body', color: '#88CC00', duration: '60 min', level: 'Low', calories: '150-250' },
  { name: 'Strength', icon: 'barbell', color: '#FF8800', duration: '50 min', level: 'Medium', calories: '250-350' },
  { name: 'Pilates', icon: 'leaf', color: '#AA88FF', duration: '45 min', level: 'Low', calories: '200-300' },
  { name: 'Boxing', icon: 'flame', color: '#FF0088', duration: '60 min', level: 'High', calories: '500-700' },
];

const weeklySchedule = [
  { day: 'Monday', sessions: ['HIIT 07:00', 'Spin 12:30', 'Yoga 18:00', 'Strength 19:30'] },
  { day: 'Tuesday', sessions: ['Pilates 07:00', 'Boxing 12:00', 'HIIT 18:30', 'Yoga 20:00'] },
  { day: 'Wednesday', sessions: ['Strength 07:00', 'Spin 12:30', 'Pilates 18:00', 'Boxing 19:30'] },
  { day: 'Thursday', sessions: ['Yoga 07:00', 'HIIT 12:00', 'Spin 18:30', 'Strength 20:00'] },
  { day: 'Friday', sessions: ['Boxing 07:00', 'Pilates 12:30', 'Yoga 18:00', 'HIIT 19:00'] },
  { day: 'Saturday', sessions: ['Spin 09:00', 'Strength 10:30', 'Yoga 11:30'] },
  { day: 'Sunday', sessions: ['Pilates 09:00', 'Yoga 10:30', 'HIIT 11:00'] },
];

export default function SessionsScreen() {
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
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      paddingHorizontal: 24,
      marginTop: 24,
      marginBottom: 16,
    },
    sessionTypeCard: {
      width: 150,
      marginRight: 16,
      padding: 20,
      borderRadius: 16,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
      alignItems: 'center',
    },
    sessionTypeIcon: {
      fontSize: 36,
      marginBottom: 12,
    },
    sessionTypeName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 8,
    },
    sessionTypeMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 4,
    },
    sessionMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sessionMetaText: {
      fontSize: 11,
      color: isDark ? '#AAAAAA' : '#666666',
      marginLeft: 4,
    },
    scheduleCard: {
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
      overflow: 'hidden',
    },
    scheduleDay: {
      padding: 16,
      backgroundColor: isDark ? '#252525' : '#F8F8F8',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#EEEEEE',
    },
    scheduleDayName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    scheduleSession: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 14,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#F0F0F0',
    },
    scheduleSessionLast: {
      borderBottomWidth: 0,
    },
    scheduleSessionName: {
      fontSize: 15,
      color: isDark ? '#FFFFFF' : '#121212',
      fontWeight: '600',
    },
    scheduleSessionTime: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#666666',
    },
    ctaButton: {
      margin: 24,
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: '#00FF66',
      alignItems: 'center',
    },
    ctaButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#121212',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Classes & Sessions</Text>
        <Text style={styles.subtitle}>Group training sessions at your branch</Text>
      </View>

      <Text style={styles.sectionTitle}>Session Types</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        {sessionTypes.map((session, index) => (
          <View key={index} style={styles.sessionTypeCard}>
            <Ionicons name={session.icon} size={36} color={session.color} style={styles.sessionTypeIcon} />
            <Text style={[styles.sessionTypeName, { color: session.color }]}>{session.name}</Text>
            <View style={styles.sessionTypeMeta}>
              <View style={styles.sessionMetaItem}>
                <Ionicons name="time" size={14} color="#888888" />
                <Text style={styles.sessionMetaText}>{session.duration}</Text>
              </View>
              <View style={styles.sessionMetaItem}>
                <Ionicons name="flame" size={14} color="#FF4444" />
                <Text style={styles.sessionMetaText}>{session.calories}</Text>
              </View>
            </View>
            <View style={styles.sessionTypeMeta}>
              <Text style={{...styles.sessionMetaText, fontWeight: 'bold', color: session.color }}>
                {session.level}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>This Week's Schedule</Text>
      {weeklySchedule.map((day, index) => (
        <View key={index} style={styles.scheduleCard}>
          <View style={styles.scheduleDay}>
            <Text style={styles.scheduleDayName}>{day.day}</Text>
          </View>
          {day.sessions.map((session, sIndex) => (
            <View key={sIndex} style={[styles.scheduleSession, sIndex === day.sessions.length - 1 && styles.scheduleSessionLast]}>
              <Text style={styles.scheduleSessionName}>{session}</Text>
              <TouchableOpacity onPress={() => alert(`Book ${session} on ${day.day} - Demo only`)}>
                <Ionicons name="add-circle" size={24} color="#00FF66" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.ctaButton} onPress={() => alert('Booking requires membership - Demo only')}>
        <Text style={styles.ctaButtonText}>Book a Session (Requires Membership)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}