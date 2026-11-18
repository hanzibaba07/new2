import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/Providers';

const branches = [
  {
    id: '1',
    name: 'London Central',
    address: '123 Oxford Street, London W1D 1BS',
    hours: 'Mon-Fri: 6:00-23:00 | Sat-Sun: 8:00-22:00',
    status: 'Open',
    facilities: ['Cardio Zone', 'Free Weights', 'Studio Classes', 'Pool', 'Sauna'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
  },
  {
    id: '2',
    name: 'Manchester North',
    address: '456 Deansgate, Manchester M3 4EN',
    hours: 'Mon-Fri: 6:30-22:30 | Sat-Sun: 8:30-21:00',
    status: 'Closing Soon',
    facilities: ['Cardio Zone', 'Free Weights', 'Studio Classes', 'Functional Area'],
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400',
  },
  {
    id: '3',
    name: 'Birmingham East',
    address: '789 Corporation Street, Birmingham B4 6QD',
    hours: 'Mon-Fri: 6:00-23:00 | Sat-Sun: 8:00-22:00',
    status: 'Open',
    facilities: ['Cardio Zone', 'Free Weights', 'Studio Classes', 'Pool', 'Squash Courts'],
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400',
  },
  {
    id: '4',
    name: 'Glasgow West',
    address: '321 Sauchiehall Street, Glasgow G2 3HW',
    hours: 'Mon-Fri: 6:30-22:00 | Sat-Sun: 9:00-20:00',
    status: 'Closed',
    facilities: ['Cardio Zone', 'Free Weights', 'Studio Classes', 'Climbing Wall'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
  },
];

export default function BranchesScreen() {
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
    branchCard: {
      margin: 16,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    branchImage: {
      width: '100%',
      height: 180,
    },
    branchContent: {
      padding: 16,
    },
    branchName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 4,
    },
    branchAddress: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#666666',
      marginBottom: 8,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    statusText: {
      fontSize: 14,
      fontWeight: '600',
    },
    hoursText: {
      fontSize: 13,
      color: isDark ? '#888888' : '#888888',
      marginBottom: 12,
    },
    facilitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },
    facilityTag: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      backgroundColor: isDark ? '#333333' : '#F0F0F0',
    },
    facilityText: {
      fontSize: 11,
      color: isDark ? '#CCCCCC' : '#555555',
    },
    selectButton: {
      backgroundColor: '#00FF66',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    selectButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#121212',
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#00FF66';
      case 'Closing Soon': return '#FFB800';
      case 'Closed': return '#FF4444';
      default: return '#888888';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Branches</Text>
        <Text style={styles.subtitle}>Find a gym near you with real-time opening status</Text>
      </View>

      {branches.map((branch) => (
        <View key={branch.id} style={styles.branchCard}>
          <View style={styles.branchImage}>
            {/* Image would go here - using colored background for demo */}
          </View>
          <View style={styles.branchContent}>
            <Text style={styles.branchName}>{branch.name}</Text>
            <Text style={styles.branchAddress}>
              <Ionicons name="location" size={16} color="#00FF66" style={{marginRight: 4}} />
              {branch.address}
            </Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(branch.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(branch.status) }]}>{branch.status}</Text>
            </View>
            <Text style={styles.hoursText}>
              <Ionicons name="time" size={14} color="#888888" style={{marginRight: 4}} />
              {branch.hours}
            </Text>
            <View style={styles.facilitiesContainer}>
              {branch.facilities.map((facility, index) => (
                <View key={index} style={styles.facilityTag}>
                  <Text style={styles.facilityText}>{facility}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={() => alert(`Selected ${branch.name}`)}>
              <Text style={styles.selectButtonText}>Select This Branch</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}