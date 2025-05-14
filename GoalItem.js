import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function GoalItem({ text, id, onDelete }) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>🌷 {text}</Text>
      <Pressable onPress={() => onDelete(id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>🗑</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffc0cb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  goalText: {
    color: '#c2185b',
    fontSize: 16,
    flex: 1,
    paddingRight: 10,
    fontFamily: 'poppins',
  },
  deleteButton: {
    width: 32,
    height: 32,
    backgroundColor: '#ff69b4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'poppins',
  },
});
