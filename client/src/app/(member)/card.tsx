import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons, BarcodeScanner } from '@expo/vector-icons';
import { useAuth, useTheme } from '../../context/Providers';

export default function CardScreen() {
  const { isDark } = useTheme();
  const { user } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#FFFFFF',
    },
    scrollView: {
      flex: 1,
    },
    cardContainer: {
      margin: 20,
      marginTop: 10,
      borderRadius: 24,
      overflow: 'hidden',
    },
    cardBackground: {
      padding: 32,
      minHeight: 280,
    },
    cardTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    logo: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#00FF66',
    },
    chip: {
      width: 48,
      height: 32,
      backgroundColor: '#FFD700',
      borderRadius: 4,
    },
    cardDetails: {
      marginBottom: 32,
    },
    memberName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    detailLabel: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.6)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    qrSection: {
      alignItems: 'center',
      marginTop: 20,
    },
    qrCode: {
      width: 120,
      height: 120,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      marginBottom: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    qrText: {
      fontSize: 10,
      color: 'rgba(255,255,255,0.7)',
      textAlign: 'center',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.1)',
    },
    cardType: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    validThru: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.6)',
    },
    infoSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 16,
    },
    infoCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    infoIcon: {
      marginRight: 16,
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 12,
      color: isDark ? '#AAAAAA' : '#666666',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: '#00FF66',
      marginTop: 8,
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#121212',
      marginLeft: 8,
    },
    note: {
      paddingHorizontal: 20,
      paddingTop: 8,
      textAlign: 'center',
      fontSize: 12,
      color: isDark ? '#888888' : '#999999',
      lineHeight: 18,
    },
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
  };

  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.cardContainer}>
        <View style={styles.cardBackground}>
          <View style={styles.cardTop}>
            <Text style={styles.logo}>FAT 2 FIT</Text>
            <View style={styles.chip} />
          </View>

          <View style={styles.cardDetails}>
            <Text style={styles.memberName}>{user?.name?.toUpperCase() || 'MEMBER NAME'}</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Member ID</Text>
              <Text style={styles.detailValue}>FT2F-{String(user?.id || '000001').padStart(6, '0')}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Branch</Text>
              <Text style={styles.detailValue}>{user?.branch || 'London Central'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Membership</Text>
              <Text style={styles.detailValue}>{user?.membershipType === 'premium' ? 'Premium' : 'Standard'}</Text>
            </View>
          </View>

          <View style={styles.qrSection}>
            <View style={styles.qrCode}>
              <BarcodeScanner
                value={`fat2fit://checkin/${user?.id || '000001'}`}
                format="qr"
                size={120}
              />
            </View>
            <Text style={styles.qrText}>
              Scan at reception for check-in/out • Code refreshes every 30s
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardType}>DIGITAL MEMBERSHIP CARD</Text>
              <Text style={styles.validThru}>Valid through {formatDate(expiryDate)}</Text>
            </View>
            <Ionicons name="logo-visa" size={32} color="rgba(255,255,255,0.8)" />
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Card Features</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark" size={24} color="#00FF66" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Secure QR Codes</Text>
              <Text style={styles.infoValue}>Time-limited codes prevent screenshot reuse</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="refresh" size={24} color="#00AAFF" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Auto Refresh</Text>
              <Text style={styles.infoValue}>New code generated every 30 seconds</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="wifi" size={24} color="#FF8800" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Works Offline</Text>
              <Text style={styles.infoValue}>QR codes cached for 5 minutes offline</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={24} color="#00FF66" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Home Branch</Text>
              <Text style={styles.infoValue}>{user?.branch || 'London Central'}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="card" size={24} color="#00AAFF" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Membership Tier</Text>
              <Text style={styles.infoValue}>{user?.membershipType === 'premium' ? 'Premium (All Access)' : 'Standard (Single Branch)'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={() => alert('QR Code refreshed - Demo')}>
          <Ionicons name="refresh" size={22} color="#121212" />
          <Text style={styles.actionButtonText}>Refresh QR Code</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          This is a demo digital card. No real payment processing. For demo purposes only.
        </Text>
      </View>
    </ScrollView>
  );
}