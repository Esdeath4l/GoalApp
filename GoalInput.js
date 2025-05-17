import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoalInput({ onAddGoal, onInputChange, enteredText, visible, onClose, isDark }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <LinearGradient
        colors={isDark ? ['#4B0082cc', '#6A0DADcc'] : ['#fff0f5cc', '#ffe4e1cc']}
        style={styles.modalContainer}
      >
        <View style={[styles.fullScreenWrapper, isDark ? styles.darkGlass : styles.lightGlass]}>
          <Text style={[styles.title, { color: isDark ? '#E6E6FA' : '#c2185b' }]}>Add New Goal</Text>
          <TextInput
            onChangeText={onInputChange}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#6a0dad88' : '#ffe4e188',
                color: isDark ? '#E6E6FA' : '#c2185b',
                borderColor: isDark ? '#d1c4e988' : '#c2185b88',
              },
            ]}
            placeholder="Your goal"
            value={enteredText}
            placeholderTextColor={isDark ? '#cbb8f988' : '#c2185b88'}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.addButtonWrapper}>
              <Button 
                onPress={onAddGoal}
                title="Add"
                color={Platform.OS === 'ios' ? undefined : isDark ? '#d1c4e988' : '#c2185b'}
              />

            </View>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.cancelButton,
                {
                  backgroundColor: isDark ? '#6a0dadcc' : '#ffc0cbcc',
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text style={[styles.cancelText, { color: isDark ? '#E6E6FA' : '#c2185b' }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  fullScreenWrapper: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#ffffff88',
    justifyContent: 'center',
  },
  darkGlass: {
    backgroundColor: 'rgba(75, 0, 130, 0.4)',
  },
  lightGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'poppins',
  },
  input: {
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 18,
    fontFamily: 'poppins',
    fontSize: 16,
    borderRadius: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButtonWrapper: {
    flex: 1,
  },
  cancelButton: {
    marginLeft: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },
  cancelText: {
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'poppins',
    textAlign: 'center',
  },
});
