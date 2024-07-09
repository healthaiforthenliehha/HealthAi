import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const useTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sound, setSound] = useState(null);
  const [soundLoaded, setSoundLoaded] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/timer_start1.mp3')
      );
      setSound(sound);
      setSoundLoaded(true);
    };
    loadSound();

    return () => {
      if (sound) {
        sound.stopAsync(); // Entlade den Sound, wenn die Komponente unmontiert wird
      }
    };
  }, []);

  const toggleTimer = async () => {
    setIsActive(!isActive);
    if (soundLoaded && sound) {
      if (!isActive) {
        await sound.playAsync();
      } else {
        await sound.stopAsync();
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    if (soundLoaded && sound) {
      sound.stopAsync(); // Sound stoppen beim Zurücksetzen
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds(prev => (prev + 100) % 1000);
        if (milliseconds >= 900) {
          setSeconds(prev => (prev + 1) % 60);
          setMilliseconds(0);
        }
        if (seconds >= 59) {
          setMinutes(prev => (prev + 1) % 60);
          setSeconds(0);
        }
        if (minutes >= 59) {
          setHours(prev => prev + 1);
          setMinutes(0);
        }
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, hours, minutes, seconds, milliseconds]);

  const stopTimerSound = () => {
    if (soundLoaded && sound) {
      sound.stopAsync();
      sound.setPositionAsync(0); // Setze die Soundposition auf den Anfang zurück
    }
  };

  return { hours, minutes, seconds, milliseconds, isActive, toggleTimer, resetTimer, stopTimerSound};
};

export default useTimer;
