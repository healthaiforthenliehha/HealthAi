import { useState, useEffect } from 'react';

const useTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        // Aktualisiere Millisekunden
        setMilliseconds(milliseconds => milliseconds + 100);
        // Wenn 1000 Millisekunden erreicht sind, erhöhe Sekunden und setze Millisekunden zurück
        if (milliseconds >= 1000) {
          setSeconds(seconds => seconds + 1);
          setMilliseconds(0);
        }
        // Wenn 60 Sekunden erreicht sind, erhöhe Minuten und setze Sekunden zurück
        if (seconds >= 60) {
          setMinutes(minutes => minutes + 1);
          setSeconds(0);
        }
        // Wenn 10 Minuten und 10 Sekunden erreicht sind, stoppe den Timer und setze alles zurück
        if (minutes === 10 && seconds === 10) {
          clearInterval(interval);
          setIsActive(false);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          setMilliseconds(0);
        }
      }, 100); // Timer wird alle 100 Millisekunden aktualisiert
    } else if (!isActive && (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0)) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, hours, minutes, seconds, milliseconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  return { hours, minutes, seconds, milliseconds, isActive, toggleTimer, resetTimer };
};

export default useTimer;
