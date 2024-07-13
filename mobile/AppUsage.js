import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let startTime;

const startTracking = () => {
  startTime = new Date().getTime();
};

const stopTracking = async () => {
  if (!startTime) return; // Fehler verhindern, falls stopTracking ohne startTracking aufgerufen wird
  const endTime = new Date().getTime();
  const duration = (endTime - startTime) / 60000; // Dauer in Minuten
  startTime = null; // startTime für den nächsten Verfolgungszeitraum zurücksetzen

  const usageTime = await AsyncStorage.getItem('usageTime');
  const totalTime = usageTime ? parseFloat(usageTime) + duration : duration;

  await AsyncStorage.setItem('usageTime', totalTime.toString());
};

const resetTracking = async () => {
  await AsyncStorage.setItem('usageTime', '0');
};

const getUsageTime = async () => {
  const usageTime = await AsyncStorage.getItem('usageTime');
  return usageTime ? parseFloat(usageTime) : 0;
};

const scheduleDailyReset = () => {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );

  const timeUntilMidnight = midnight.getTime() - now.getTime();

  setTimeout(async () => {
    await resetTracking();
    scheduleDailyReset();
  }, timeUntilMidnight);
};

const initTracking = () => {
  AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      startTracking();
    } else if (nextAppState.match(/inactive|background/)) {
      stopTracking();
    }
  });

  startTracking(); // Initialer Start
  scheduleDailyReset(); // Tägliches Zurücksetzen planen
};

export { initTracking, getUsageTime, resetTracking };
