import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
  Switch,
  Platform,
  SafeAreaView,
} from 'react-native';
import GoalInput from './GoalInput';
import GoalItem from './GoalItem';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [manualDarkMode, setManualDarkMode] = useState(null);
  const isDark = manualDarkMode === null ? false : manualDarkMode;

  // Load theme on mount
  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) setManualDarkMode(JSON.parse(storedTheme));
      } catch (e) {
        console.log('Failed to load theme', e);
      }
    }
    loadTheme();
  }, []);

  // Save theme when changed
  useEffect(() => {
    async function saveTheme() {
      try {
        if (manualDarkMode !== null) {
          await AsyncStorage.setItem('theme', JSON.stringify(manualDarkMode));
        }
      } catch (e) {
        console.log('Failed to save theme', e);
      }
    }
    saveTheme();
  }, [manualDarkMode]);

  // Play sound
  async function playSound(type) {
    try {
      const sound = new Audio.Sound();
      const soundFile =
        type === 'add'
          ? require('./assets/sounds/add.mp3')
          : require('./assets/sounds/delete.mp3');
      await sound.loadAsync(soundFile);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (err) {
      console.log('Error playing sound:', err);
    }
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) return;
    playSound('add');
    setGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), text: enteredGoalText },
    ]);
    setEnteredGoalText('');
    setModalVisible(false);
  }

  function deleteGoalHandler(id) {
    playSound('delete');
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  }

  function inputChangeHandler(text) {
    setEnteredGoalText(text);
  }

  function toggleTheme() {
    setManualDarkMode((prev) => (prev === null ? true : prev ? false : null));
  }

  return (
    <SafeAreaView
      style={[styles.rootContainer, { backgroundColor: isDark ? '#2E0854' : '#ffe4e1' }]}
    >
      <LinearGradient
        colors={isDark ? ['#2e003e', '#6a0dad'] : ['#f48fb1', '#c2185b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
         <Image
          source={require('./assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.heading, { color: '#E6E6FA' }]}>My Daily Goals</Text>
        <View style={styles.themeToggleContainer}>
          <Text style={{ color: '#E6E6FA', fontFamily: 'poppins', marginRight: 10 }}>
            Theme: {manualDarkMode === null ? 'Light' : manualDarkMode ? 'Dark' : 'Light'}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={Platform.OS === 'android' ? (isDark ? '#d1c4e9' : '#f48fb1') : undefined}
            trackColor={{ false: '#f8bbd0', true: '#7e57c2' }}
          />
        </View>

        <View style={styles.addGoalButtonContainer}>
          <View style={[styles.buttonWrapper, { borderRadius: 12, overflow: 'hidden' }]}>
            <Button
              title="Add New Goal"
              color={isDark ? '#d1c4e9' : '#c2185b'}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      </LinearGradient>

      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        {goals.length === 0 ? (
          <Text
            style={{
              marginTop: 40,
              textAlign: 'center',
              fontFamily: 'poppins',
              fontSize: 16,
              color: isDark ? '#ccc' : '#555',
            }}
          >
            No goals added yet. Start by adding one!
          </Text>
        ) : (
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GoalItem
                id={item.id}
                text={item.text}
                onDelete={deleteGoalHandler}
                isDark={isDark}
              />
            )}
          />
        )}
      </View>

      <GoalInput
        visible={modalVisible}
        onAddGoal={addGoalHandler}
        onInputChange={inputChangeHandler}
        enteredText={enteredGoalText}
        onClose={() => setModalVisible(false)}
        isDark={isDark}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 12,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    fontFamily: 'poppins',
    letterSpacing: 1,
    marginBottom: 8,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addGoalButtonContainer: {
    marginHorizontal: 32,
    marginBottom: 20,
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
