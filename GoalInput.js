import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from './Appext';

export default function GoalInput({
  onAddGoal,
  onInputChange,
  enteredText,
  visible,
  onClose,
  isDark,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <LinearGradient
            colors={isDark ? ['#4B0082cc', '#6A0DADcc'] : ['#fff0f5cc', '#ffe4e1cc']}
            style={styles.modalContainer}
          >
            <View
              style={[
                styles.fullScreenWrapper,
                isDark ? styles.darkGlass : styles.lightGlass,
              ]}
            >
              <AppText
                bold
                style={[styles.title, { color: isDark ? '#E6E6FA' : '#c2185b' }]}
              >
                Add New Goal
              </AppText>

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
                <Pressable
                  onPress={onAddGoal}
                  style={({ pressed }) => [
                    styles.button,
                    {
                      backgroundColor: isDark ? '#d1c4e988' : '#c2185bcc',
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <AppText style={[styles.buttonText, { color: isDark ? '#4B0082' : '#fff' }]}>
                    Add
                  </AppText>
                </Pressable>

                <Pressable
                  onPress={onClose}
                  style={({ pressed }) => [
                    styles.button,
                    {
                      backgroundColor: isDark ? '#6a0dadcc' : '#ffc0cbcc',
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <AppText style={[styles.buttonText, { color: isDark ? '#E6E6FA' : '#c2185b' }]}>
                    Cancel
                  </AppText>
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
    backgroundColor: 'rgba(255,192,203, 0.4)',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    fontFamily: 'poppins',
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'poppins',
  },
});
