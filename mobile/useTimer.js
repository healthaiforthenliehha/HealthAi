import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const useTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sounds, setSounds] = useState([]);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [dailyMinutes, setDailyMinutes] = useState(0);
  const [timerStart, setTimerStart] = useState(null);

  useEffect(() => {
    const loadSounds = async () => {
      const sound1 = await Audio.Sound.createAsync(require('../assets/timer_start1.mp3'));
      const sound2 = await Audio.Sound.createAsync(require('../assets/timer_start2.mp3'));
      const sound3 = await Audio.Sound.createAsync(require('../assets/timer_start3.mp3'));
      
      setSounds([sound1.sound, sound2.sound, sound3.sound]);
      setSoundLoaded(true);
    };
    loadSounds();

    return () => {
      sounds.forEach(sound => {
        if (sound) {
          sound.stopAsync(); // Entlade die Sounds, wenn die Komponente unmontiert wird
        }
      });
    };
  }, []);

  const toggleTimer = async () => {
    if (!isActive) {
      setTimerStart(new Date()); // Timer-Startzeit speichern
      if (soundLoaded && sounds.length) {
        const randomIndex = Math.floor(Math.random() * sounds.length);
        await sounds[randomIndex].playAsync();
      }
    } else {
      const elapsed = (new Date() - timerStart) / 60000; // Zeit in Minuten berechnen
      setDailyMinutes(prev => prev + elapsed);
      sounds.forEach(async (sound) => await sound.stopAsync());
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    if (soundLoaded && sounds.length) {
      sounds.forEach(async (sound) => await sound.stopAsync()); // Alle Sounds stoppen beim Zurücksetzen
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

  useEffect(() => {
    const resetDailyMinutes = () => {
      setDailyMinutes(0);
    };

    const getNextMidnight = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      return midnight - now;
    };

    const midnightTimeout = setTimeout(() => {
      resetDailyMinutes();
      setInterval(resetDailyMinutes, 24 * 60 * 60 * 1000); // Jeden Tag um Mitternacht zurücksetzen
    }, getNextMidnight());

    return () => clearTimeout(midnightTimeout);
  }, []);

  const stopTimerSound = () => {
    if (soundLoaded && sounds.length) {
      sounds.forEach(async (sound) => {
        await sound.stopAsync();
        await sound.setPositionAsync(0); // Setze die Soundposition auf den Anfang zurück
      });
    }
  };

  return { 
    hours, 
    minutes, 
    seconds, 
    milliseconds, 
    isActive, 
    toggleTimer, 
    resetTimer, 
    stopTimerSound, 
    dailyMinutes 
  };
};

export default useTimer;
