// useStepTracker.js
import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStepTracker = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

  useEffect(() => {
    const checkPedometerAvailability = async () => {
      try {
        const result = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(result));
      } catch (error) {
        setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
      }
    };

    const subscribeToStepCount = () => {
      return Pedometer.watchStepCount(result => {
        setStepCount(result.steps);
        storeStepCount(result.steps);
      });
    };

    const storeStepCount = async (steps) => {
      try {
        await AsyncStorage.setItem('dailySteps', steps.toString());
      } catch (error) {
        console.error('Failed to save step count:', error);
      }
    };

    const fetchStepCount = async () => {
      try {
        const storedSteps = await AsyncStorage.getItem('dailySteps');
        if (storedSteps !== null) {
          setStepCount(parseInt(storedSteps, 10));
        }
      } catch (error) {
        console.error('Failed to fetch step count:', error);
      }
    };

    checkPedometerAvailability();
    const subscription = subscribeToStepCount();
    fetchStepCount();

    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    const resetStepsAtMidnight = () => {
      const now = new Date();
      const msUntilMidnight = 
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) - now;

      const timeout = setTimeout(() => {
        setStepCount(0);
        storeStepCount(0);
        resetStepsAtMidnight(); // Recursive call for the next day
      }, msUntilMidnight);

      return () => clearTimeout(timeout);
    };

    resetStepsAtMidnight();
  }, []);

  return { stepCount, isPedometerAvailable };
};

export default useStepTracker;