import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons, BarcodeScanner } from '@expo/vector-icons';
import { useAuth, useTheme } from '../../context/Providers';

export default function CheckInScreen() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState('00:00:00');
  const [qrCode, setQrCode] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [animation] = useState(new Animated.Value(0));
  const [lastScanResult, setLastScanResult] = useState<string | null>(null);

  // Generate new QR code
  const generateQrCode = () => {
    const timestamp = Date.now();
    const code = `fat2fit://checkin/${user?.id || '000001'}/${timestamp}`;
    setQrCode(code);
    setTimeRemaining(30);
    startCountdown();
  };

  // Start countdown timer
  const startCountdown = () => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          generateQrCode();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Pulse animation for QR code
  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  // Update duration when checked in
  useEffect(() => {
    if (isCheckedIn && checkInTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDuration(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCheckedIn, checkInTime]);

  // Initialize on mount
  useEffect(() => {
    generateQrCode();
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setIsCheckedIn(true);
    setLastScanResult('CHECK-IN SUCCESSFUL');
    Alert.alert('Check-In Successful', `Welcome to ${user?.branch}! Your session has started.`);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
    setLastScanResult('CHECK-OUT SUCCESSFUL');
    Alert.alert('Check-Out Successful', `Session ended. Duration: ${duration}. Great workout!`);
  };

  const handleScan = (type: 'in' | 'out') => {
    // Simulate scanner
    Alert.alert(
      type === 'in' ? 'Scan to Check In' : 'Scan to Check Out',
      'Point your camera at the QR code at reception.\n\n[Demo: Tap OK to simulate successful scan]',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: type === 'in' ? handleCheckIn : handleCheckOut },
      ]
    );
  };

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
      paddingBottom: 12,
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
    statusCard: {
      margin: 20,
      marginTop: 10,
      borderRadius: 20,
      padding: 24,
      overflow: 'hidden',
    },
    checkedInCard: {
      backgroundColor: '#1A3A2A',
      borderWidth: 2,
      borderColor: '#00FF66',
    },
    checkedOutCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    statusHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    checkedInBadge: {
      backgroundColor: 'rgba(0, 255, 102, 0.2)',
    },
    checkedOutBadge: {
      backgroundColor: isDark ? '#333333' : '#F0F0F0',
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    statusText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    checkedInText: {
      color: '#00FF66',
    },
    checkedOutText: {
      color: isDark ? '#AAAAAA' : '#666666',
    },
    branchText: {
      fontSize: 14,
      color: isDark ? '#CCCCCC' : '#666666',
    },
    timerContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    timerLabel: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#666666',
      marginBottom: 8,
    },
    timerValue: {
      fontSize: 48,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      color: isCheckedIn ? '#00FF66' : (isDark ? '#FFFFFF' : '#121212'),
    },
    qrContainer: {
      alignItems: 'center',
    },
    qrCodeWrapper: {
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      marginBottom: 12,
    },
    qrCode: {
      width: 200,
      height: 200,
    },
    qrInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    qrTimer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: isDark ? '#333333' : '#F0F0F0',
    },
    qrTimerText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#00FF66',
      marginLeft: 6,
    },
    qrNote: {
      fontSize: 11,
      color: isDark ? '#888888' : '#999999',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 12,
    },
    checkInButton: {
      backgroundColor: '#00FF66',
    },
    checkOutButton: {
      backgroundColor: '#FF4444',
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: 8,
    },
    actionButtonDisabled: {
      opacity: 0.5,
    },
    scanButton: {
      marginTop: 16,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: isDark ? '#333333' : '#F0F0F0',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    scanButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#121212',
      marginLeft: 8,
    },
    lastResult: {
      marginTop: 24,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1A3A2A' : '#E8F5E9',
      borderWidth: 1,
      borderColor: '#00FF66',
      alignItems: 'center',
    },
    lastResultText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#00FF66',
    },
    infoSection: {
      padding: 20,
      paddingTop: 0,
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
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#121212',
    },
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Check In / Out</Text>
        <Text style={styles.subtitle}>
          {isCheckedIn ? 'Currently training - tap check out when done' : 'Scan QR code at reception to start your session'}
        </Text>
      </View>

      <View style={[styles.statusCard, isCheckedIn ? styles.checkedInCard : styles.checkedOutCard]}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusBadge, isCheckedIn ? styles.checkedInBadge : styles.checkedOutBadge]}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isCheckedIn ? '#00FF66' : (isDark ? '#666666' : '#999999') },
              ]}
            />
            <Text style={[styles.statusText, isCheckedIn ? styles.checkedInText : styles.checkedOutText]}>
              {isCheckedIn ? 'CHECKED IN' : 'CHECKED OUT'}
            </Text>
          </View>
          <Text style={styles.branchText}>
            <Ionicons name="location" size={16} color="#00FF66" style={{marginRight: 4}} />
            {user?.branch || 'London Central'}
          </Text>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>
            {isCheckedIn ? 'Session Duration' : 'Ready to Start'}
          </Text>
          <Text style={styles.timerValue}>{duration}</Text>
        </View>

        <View style={styles.qrContainer}>
          <Animated.View
            style={{
              opacity: animation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.7, 1],
              }),
            }}
          >
            <View style={styles.qrCodeWrapper}>
              <BarcodeScanner
                value={qrCode}
                format="qr"
                size={200}
              />
            </View>
          </Animated.View>
          <View style={styles.qrInfo}>
            <View style={styles.qrTimer}>
              <Ionicons name="time" size={18} color="#00FF66" />
              <Text style={styles.qrTimerText}>Refreshes in {timeRemaining}s</Text>
            </View>
          </View>
          <Text style={styles.qrNote}>
            Show this code at reception • Time-limited for security
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.checkInButton, isCheckedIn && styles.actionButtonDisabled]}
            onPress={() => handleScan('in')}
            disabled={isCheckedIn}
          >
            <Ionicons name="login" size={22} color="#121212" />
            <Text style={styles.actionButtonText}>Check In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.checkOutButton, !isCheckedIn && styles.actionButtonDisabled]}
            onPress={() => handleScan('out')}
            disabled={!isCheckedIn}
          >
            <Ionicons name="logout" size={22} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Check Out</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.scanButton} onPress={() => handleScan(isCheckedIn ? 'out' : 'in')}>
          <Ionicons name="qr-code" size={22} color="#00FF66" />
          <Text style={styles.scanButtonText}>Scan Reception QR Code</Text>
        </TouchableOpacity>

        {lastScanResult && (
          <View style={styles.lastResult}>
            <Text style={styles.lastResultText}>{lastScanResult}</Text>
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How It Works</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark" size={24} color="#00FF66" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Time-Limited QR Codes</Text>
              <Text style={styles.infoValue}>Codes refresh every 30 seconds to prevent screenshot reuse</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="lock-closed" size={24} color="#00AAFF" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Secure Verification</Text>
              <Text style={styles.infoValue}>Server validates code expiry and prevents duplicate scans</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="sync" size={24} color="#FF8800" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Real-Time Sync</Text>
              <Text style={styles.infoValue}>Check-in/out instantly updates website and app</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="alert-circle" size={24} color="#FF4444" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Missed Check-Out?</Text>
              <Text style={styles.infoValue}>Auto check-out at closing time with logged duration</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="wifi" size={24} color="#88CC00" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Offline Support</Text>
              <Text style={styles.infoValue}>Cached codes work for 5 minutes without connection</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}