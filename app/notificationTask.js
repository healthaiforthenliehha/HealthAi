import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

TaskManager.defineTask('DRINK_WATER_NOTIFICATION', () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Erinnerung",
      body: "Hast du heute schon getrunken?",
      sound: true,
    },
    trigger: {
      seconds: 2 * 60 * 60, // alle 2 Stunden
      repeats: true,
    },
  });
});
