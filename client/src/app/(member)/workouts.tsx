import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, useTheme } from '../../context/Providers';

const workoutTemplates = [
  { name: 'Push Day', exercises: ['Bench Press', 'Shoulder Press', 'Tricep Dips', 'Incline Dumbbell Press'], focus: 'Chest, Shoulders, Triceps' },
  { name: 'Pull Day', exercises: ['Pull Ups', 'Barbell Rows', 'Face Pulls', 'Bicep Curls'], focus: 'Back, Biceps' },
  { name: 'Leg Day', exercises: ['Squats', 'Romanian Deadlifts', 'Leg Press', 'Calf Raises'], focus: 'Quads, Hamstrings, Glutes' },
  { name: 'Full Body', exercises: ['Deadlifts', 'Push Press', 'Pull Ups', 'Lunges', 'Plank'], focus: 'Full Body' },
];

const recentWorkouts = [
  { date: 'Today', name: 'Push Day', duration: '1h 20m', exercises: 4, sets: 16, volume: '8,450 kg' },
  { date: 'Dec 14', name: 'Pull Day', duration: '1h 15m', exercises: 4, sets: 14, volume: '6,200 kg' },
  { date: 'Dec 12', name: 'Leg Day', duration: '1h 30m', exercises: 5, sets: 18, volume: '12,800 kg' },
  { date: 'Dec 10', name: 'Full Body', duration: '1h 10m', exercises: 5, sets: 15, volume: '7,600 kg' },
];

export default function WorkoutsScreen() {
  const { isDark } = useTheme();
  const [showLogModal, setShowLogModal] = useState(false);
  const [logForm, setLogForm] = useState({
    name: '',
    duration: '',
    exercises: [{ name: '', sets: '', reps: '', weight: '' }],
  });

  const addExercise = () => {
    setLogForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: '', reps: '', weight: '' }],
    }));
  };

  const removeExercise = (index: number) => {
    if (logForm.exercises.length > 1) {
      setLogForm(prev => ({
        ...prev,
        exercises: prev.exercises.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSaveWorkout = () => {
    Alert.alert('Workout Logged', 'Your workout has been saved! (Demo)');
    setShowLogModal(false);
    setLogForm({ name: '', duration: '', exercises: [{ name: '', sets: '', reps: '', weight: '' }] });
  };

  const selectTemplate = (template: typeof workoutTemplates[0]) => {
    setLogForm({
      name: template.name,
      duration: '',
      exercises: template.exercises.map(ex => ({ name: ex, sets: '3', reps: '10', weight: '' })),
    });
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    logButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#00FF66',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
    },
    logButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#121212',
      marginLeft: 6,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      paddingHorizontal: 24,
      marginTop: 24,
      marginBottom: 12,
    },
    templateCard: {
      marginHorizontal: 16,
      marginBottom: 12,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    templateInfo: {
      flex: 1,
    },
    templateName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
      marginBottom: 4,
    },
    templateFocus: {
      fontSize: 13,
      color: isDark ? '#AAAAAA' : '#666666',
      marginBottom: 4,
    },
    templateExercises: {
      fontSize: 12,
      color: '#00FF66',
      fontWeight: '600',
    },
    templateButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#00FF66',
    },
    templateButtonText: {
      color: '#00FF66',
      fontWeight: 'bold',
      fontSize: 13,
    },
    workoutCard: {
      marginHorizontal: 16,
      marginBottom: 12,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#EEEEEE',
    },
    workoutHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    workoutDate: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#00FF66',
    },
    workoutName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    workoutStats: {
      flexDirection: 'row',
      gap: 20,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? '#AAAAAA' : '#666666',
    },
    exerciseList: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#333333' : '#EEEEEE',
    },
    exerciseRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    exerciseName: {
      fontSize: 14,
      color: isDark ? '#CCCCCC' : '#333333',
    },
    exerciseDetails: {
      fontSize: 13,
      color: isDark ? '#AAAAAA' : '#666666',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 20,
      maxHeight: '90%',
      width: '100%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#EEEEEE',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#121212',
    },
    modalClose: {
      padding: 4,
    },
    modalBody: {
      padding: 20,
      maxHeight: 400,
    },
    inputGroup: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#CCCCCC' : '#333333',
      marginBottom: 8,
    },
    input: {
      height: 48,
      backgroundColor: isDark ? '#121212' : '#F5F5F5',
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#121212',
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#DDDDDD',
    },
    inputRow: {
      flexDirection: 'row',
      gap: 8,
    },
    inputSmall: {
      flex: 1,
    },
    exerciseCard: {
      backgroundColor: isDark ? '#252525' : '#F8F8F8',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    exerciseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    exerciseInput: {
      flex: 1,
      marginRight: 8,
    },
    removeButton: {
      padding: 4,
    },
    setsRow: {
      flexDirection: 'row',
      gap: 8,
    },
    saveButton: {
      margin: 20,
      marginTop: 0,
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: '#00FF66',
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#121212',
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
      paddingTop: 20,
    },
    emptyText: {
      fontSize: 16,
      color: isDark ? '#AAAAAA' : '#666666',
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity style={styles.logButton} onPress={() => setShowLogModal(true)}>
          <Ionicons name="add" size={20} color="#121212" />
          <Text style={styles.logButtonText}>Log Workout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Quick Start Templates</Text>
      {workoutTemplates.map((template, index) => (
        <TouchableOpacity
          key={index}
          style={styles.templateCard}
          onPress={() => selectTemplate(template)}
        >
          <View style={styles.templateInfo}>
            <Text style={styles.templateName}>{template.name}</Text>
            <Text style={styles.templateFocus}>{template.focus}</Text>
            <Text style={styles.templateExercises}>
              {template.exercises.length} exercises • Tap to start
            </Text>
          </View>
          <View style={styles.templateButton}>
            <Text style={styles.templateButtonText}>Use Template</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Recent Workouts</Text>
      {recentWorkouts.length > 0 ? (
        recentWorkouts.map((workout, index) => (
          <View key={index} style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutDate}>{workout.date}</Text>
              <Text style={styles.workoutName}>{workout.name}</Text>
            </View>
            <View style={styles.workoutStats}>
              <View style={styles.statItem}>
                <Ionicons name="time" size={16} color="#00FF66" />
                <Text style={styles.statValue}>{workout.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="fitness" size={16} color="#00AAFF" />
                <Text style={styles.statValue}>{workout.exercises} exercises</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="reorder" size={16} color="#FF8800" />
                <Text style={styles.statValue}>{workout.sets} sets</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="barbell" size={16} color="#FF4444" />
                <Text style={styles.statValue}>{workout.volume}</Text>
              </View>
            </View>
            <View style={styles.exerciseList}>
              <View style={styles.exerciseRow}>
                <Text style={styles.exerciseName}>View Details</Text>
                <Ionicons name="chevron-forward" size={18} color="#888888" />
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="fitness" size={64} color="#333333" />
          <Text style={styles.emptyText}>No workouts logged yet.\nTap "Log Workout" to start tracking!</Text>
        </View>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>

    <Modal visible={showLogModal} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
        keyboardVerticalOffset={0}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log New Workout</Text>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowLogModal(false)}>
              <Ionicons name="close" size={28} color={isDark ? '#FFFFFF' : '#121212'} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Workout Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Push Day, Leg Day, Custom"
                value={logForm.name}
                onChangeText={name => setLogForm({ ...logForm, name })}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                placeholder="60"
                value={logForm.duration}
                onChangeText={duration => setLogForm({ ...logForm, duration })}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.inputLabel}>Exercises</Text>
            {logForm.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <TextInput
                    style={[styles.input, styles.exerciseInput]}
                    placeholder="Exercise name"
                    value={exercise.name}
                    onChangeText={name => {
                      const newExercises = [...logForm.exercises];
                      newExercises[index] = { ...exercise, name };
                      setLogForm({ ...logForm, exercises: newExercises });
                    }}
                    autoCapitalize="words"
                  />
                  {logForm.exercises.length > 1 && (
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeExercise(index)}>
                      <Ionicons name="trash" size={22} color="#FF4444" />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.setsRow}>
                  <TextInput
                    style={[styles.input, styles.inputSmall]}
                    placeholder="Sets"
                    value={exercise.sets}
                    onChangeText={sets => {
                      const newExercises = [...logForm.exercises];
                      newExercises[index] = { ...exercise, sets };
                      setLogForm({ ...logForm, exercises: newExercises });
                    }}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.input, styles.inputSmall]}
                    placeholder="Reps"
                    value={exercise.reps}
                    onChangeText={reps => {
                      const newExercises = [...logForm.exercises];
                      newExercises[index] = { ...exercise, reps };
                      setLogForm({ ...logForm, exercises: newExercises });
                    }}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.input, styles.inputSmall]}
                    placeholder="Weight (kg)"
                    value={exercise.weight}
                    onChangeText={weight => {
                      const newExercises = [...logForm.exercises];
                      newExercises[index] = { ...exercise, weight };
                      setLogForm({ ...logForm, exercises: newExercises });
                    }}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={addExercise}>
              <Text style={{ color: '#00FF66', fontWeight: 'bold', fontSize: 15 }}>
                + Add Another Exercise
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
              <Text style={styles.saveButtonText}>Save Workout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}