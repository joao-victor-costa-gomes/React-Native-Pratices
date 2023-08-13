import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// hook for the functions 
const useTimer = (initialSeconds, initialBackgroundColor) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor);

  useEffect(() => {
    let intervalId;
    if (running && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setRunning(false);
      setSeconds(initialSeconds);
      setBackgroundColor(initialBackgroundColor);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running, seconds, initialSeconds, initialBackgroundColor]);

  const startTimer01 = (startTimer02) => {
    if (running) {
      clearTimer();
      setBackgroundColor(initialBackgroundColor);
      startTimer02()
    } else {
      setBackgroundColor("darkturquoise");
      setRunning(true);
    }
  };

  const startTimer02 = (startTimer01) => {
    if (running) {
      clearTimer();
      setBackgroundColor(initialBackgroundColor);
      startTimer01()
    } else {
      setBackgroundColor("tomato");
      setRunning(true);
    }
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const clearTimer = () => {
    setSeconds(initialSeconds);
    setRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    seconds,
    backgroundColor,
    startTimer01,
    startTimer02,
    stopTimer,
    clearTimer,
    formatTime,
  };
};

// cyan button 
export function Button01() {
  const { seconds, backgroundColor, startTimer01, formatTime } = useTimer(10, "gray");

  return (
    <TouchableOpacity
      style={[styles.button_style, { backgroundColor: backgroundColor }]}
      onPress={startTimer01}
    >
      <Text style={styles.heads_down}>{formatTime(seconds)}</Text>
    </TouchableOpacity>
  );
}

// red button
export function Button02() {
  const { seconds, backgroundColor, startTimer02, formatTime } = useTimer(10, "gray");

  return (
    <TouchableOpacity
      style={[styles.button_style, { backgroundColor: backgroundColor }]}
      onPress={startTimer02}
    >
      <Text style={styles.text_style}>{formatTime(seconds)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button_style: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 10,
  },

  text_style: {
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
  },

  heads_down: {
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
    transform: [{ rotate: '180deg' }],
  },
});
