import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Pressable,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoalInput({
  onAddGoal,
  onInputChange,
  enteredText,
  visible,
  onClose,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <LinearGradient
        colors={['#ffdde1', '#ee9ca7']}
        style={styles.modalContainer}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.title}>Add New Goal</Text>
          <TextInput
            onChangeText={onInputChange}
            style={styles.input}
            placeholder="Your goal"
            value={enteredText}
            placeholderTextColor="#d63384"
          />
          <View style={styles.buttonsContainer}>
            <Button onPress={onAddGoal} title="Add" color="#ff1493" />
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
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
    justifyContent: 'center',
    padding: 24,
  },
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#d63384',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff69b4',
    backgroundColor: '#fff0f5',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    color: '#d63384',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    marginLeft: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffc0cb',
    borderRadius: 6,
  },
  cancelText: {
    color: '#d63384',
    fontWeight: '600',
  },
});
