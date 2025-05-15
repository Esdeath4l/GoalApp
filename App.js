import { FlatList, Text, View, StyleSheet, Button, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import GoalItem from './GoalItem';
import GoalInput from './GoalInput';

export default function App() {
  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadGoals() {
      try {
        const storedGoals = await AsyncStorage.getItem('goals');
        if (storedGoals !== null) {
          setGoals(JSON.parse(storedGoals));
        }
      } catch (error) {
        console.error('Failed to load goals:', error);
      }
    }
    loadGoals();
  }, []);

  useEffect(() => {
    async function saveGoals() {
      try {
        await AsyncStorage.setItem('goals', JSON.stringify(goals));
      } catch (error) {
        console.error('Failed to save goals:', error);
      }
    }
    saveGoals();
  }, [goals]);

  const fetchFonts = () =>
    Font.loadAsync({
      'poppins': require('./fonts/Poppins-Regular.ttf'),
    });

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  function addGoalHandler() {
    if (goalText.trim().length === 0) return;
    const newGoal = { id: Date.now().toString(), text: goalText };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setGoalText('');
    setModalVisible(false);
  }

  function deleteGoalHandler(goalId) {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId)
    );
  }

  return (
    <LinearGradient colors={['#ffdde1', '#ee9ca7']} style={styles.gradientBackground}>
      <View style={styles.appContainer}>
        <Text style={styles.heading}> My Daily Goals</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Add New Goal"
            color={Platform.OS === 'ios' ? undefined : '#ff69b4'}
            onPress={() => setModalVisible(true)}
          />
        </View>
        <GoalInput
          onAddGoal={addGoalHandler}
          onInputChange={setGoalText}
          enteredText={goalText}
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
        <FlatList
          style={styles.goalList}
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GoalItem
              text={itemData.item.text}
              id={itemData.item.id}
              onDelete={deleteGoalHandler}
            />
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#c2185b',
    fontFamily: 'poppins',
    
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  buttonContainer: {
    marginBottom: 15,
    backgroundColor: '#ff69b4',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  goalList: {
    marginTop: 20,
  },
});
