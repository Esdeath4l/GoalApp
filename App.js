import 'react-native-get-random-values';
import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Switch,
  Platform,
  SafeAreaView,
  Pressable,
} from 'react-native';
import GoalInput from './GoalInput';
import GoalItem from './GoalItem';
import AppText from './Appext';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { v4 as uuidv4 } from 'uuid';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [fontsLoaded] = useFonts({
    poppins: require('./fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./fonts/Poppins-Bold.ttf'),
  });

  // Use useRef to store sounds to avoid reloading every time
  const addSound = useRef();
  const deleteSound = useRef();

  useEffect(() => {
    // Load sounds once on mount
    async function loadSounds() {
      try {
        const { sound: soundAdd } = await Audio.Sound.createAsync(require('./assets/sounds/add.mp3'));
        addSound.current = soundAdd;

        const { sound: soundDelete } = await Audio.Sound.createAsync(require('./assets/sounds/delete.mp3'));
        deleteSound.current = soundDelete;
      } catch (error) {
        console.log('Error loading sounds:', error);
      }
    }
    loadSounds();

    // Cleanup on unmount
    return () => {
      if (addSound.current) {
        addSound.current.unloadAsync();
      }
      if (deleteSound.current) {
        deleteSound.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const storedGoals = await AsyncStorage.getItem('goals');
        if (storedGoals) setGoals(JSON.parse(storedGoals));
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) setIsDark(storedTheme === 'dark');
      } catch (error) {
        console.log('Failed to load data:', error);
      } finally {
        SplashScreen.hideAsync();
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('goals', JSON.stringify(goals)).catch((err) =>
      console.log('Failed to save goals:', err)
    );
  }, [goals]);

  useEffect(() => {
    AsyncStorage.setItem('theme', isDark ? 'dark' : 'light').catch((err) =>
      console.log('Failed to save theme:', err)
    );
  }, [isDark]);

  async function playAddSound() {
    try {
      if (addSound.current) {
        await addSound.current.replayAsync();
      }
    } catch (error) {
      console.log('Error playing add sound:', error);
    }
  }

  async function playDeleteSound() {
    try {
      if (deleteSound.current) {
        await deleteSound.current.replayAsync();
      }
    } catch (error) {
      console.log('Error playing delete sound:', error);
    }
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
    setEnteredGoalText('');
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) return;
    setGoals((currentGoals) => [
      ...currentGoals,
      { id: uuidv4(), text: enteredGoalText },
    ]);
    playAddSound();
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
    playDeleteSound();
  }

  function inputChangeHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={isDark ? ['#2C003E', '#5A00A0'] : ['#ffdde1', '#ffc0cb']}
        style={styles.appContainer}
      >
        <View style={styles.header}>
          <AppText bold style={[styles.headerText, { color: isDark ? '#E6E6FA' : '#c2185b' }]}>
            Goal Tracker
          </AppText>
          <View style={styles.themeSwitch}>
            <AppText style={{ color: isDark ? '#E6E6FA' : '#c2185b', marginRight: 8 }}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </AppText>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>

        <Pressable
          onPress={startAddGoalHandler}
          style={({ pressed }) => [
            styles.addGoalButton,
            {
              backgroundColor: isDark ? '#6a0dad' : '#c2185b',
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <AppText bold style={styles.addGoalButtonText}>
            Add New Goal
          </AppText>
        </Pressable>

        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onInputChange={inputChangeHandler}
          enteredText={enteredGoalText}
          onClose={endAddGoalHandler}
          isDark={isDark}
        />

        {goals.length === 0 ? (
          <View style={styles.noGoalsContainer}>
            <AppText style={[styles.noGoalsText, { color: isDark ? '#E6E6FA' : '#c2185b' }]}>
              No goals yet. Add one!
            </AppText>
          </View>
        ) : (
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GoalItem id={item.id} text={item.text} onDelete={deleteGoalHandler} isDark={isDark} />
            )}
            style={{ marginTop: 16 }}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
  },
  themeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  addGoalButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  addGoalButtonText: {
    color: 'white',
    fontSize: 18,
  },
  noGoalsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGoalsText: {
    fontSize: 20,
  },
});
