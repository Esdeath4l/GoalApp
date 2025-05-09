import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import GoalItem from './GoalItem';
import GoalInput from './GoalInput';

export default function App() {
  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  function addGoalHandler() {
    if (goalText.trim().length === 0) return;
    setGoals((currentGoals) => [...currentGoals, goalText]);
    setGoalText('');
    setModalVisible(false);
  }

  function deleteGoalHandler(goalText) {
    setGoals((currentGoals) => currentGoals.filter(goal => goal !== goalText));
  }

  return (
    <LinearGradient
      colors={['#ffdde1', '#ee9ca7']}
      style={styles.gradientBackground}
    >
      <View style={styles.appContainer}>
        <Text style={styles.heading}>🌸 My Daily Goals</Text>
        <Button title="Add New Goal" color="#ff69b4" onPress={() => setModalVisible(true)} />
        <GoalInput
          onAddGoal={addGoalHandler}
          onInputChange={setGoalText}
          enteredText={goalText}
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
        <FlatList
          style={{ marginTop: 16 }}
          data={goals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <GoalItem text={itemData.item} onDelete={() => deleteGoalHandler(itemData.item)} />
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
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#c2185b',
  },
});
