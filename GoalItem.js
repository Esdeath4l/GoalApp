// GoalItem.js
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoalItem({ id, text, onDelete, isDark }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.goalItem,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={isDark ? ['#5B2C6F', '#4B0082'] : ['#ff77aa', '#ff1493']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <Text style={[styles.goalText, { color: isDark ? '#E6E6FA' : '#fff', fontFamily: 'poppins' }]}>
          {text}
        </Text>

        <Pressable
          android_ripple={{ color: '#7B68EE' }}
          onPress={() => onDelete(id)}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.pressedDeleteButton,
            { backgroundColor: isDark ? '#6A0DAD' : '#ff1493' },
          ]}
        >
          <Text style={styles.deleteText}>🗑</Text>
        </Pressable>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    marginVertical: 8,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  gradientBackground: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  goalText: {
    fontSize: 18,
    flex: 1,
    paddingRight: 12,
  },
  deleteButton: {
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 6,
  },
  pressedDeleteButton: {
    opacity: 0.7,
  },
  deleteText: {
    fontSize: 20,
    color: '#fff',
  },
});
