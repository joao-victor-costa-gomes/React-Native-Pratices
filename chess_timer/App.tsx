import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";

import Button from './src/components/buttons/timer_button';
import Reset from './src/components/buttons/reset_button';
import Pause_Play from './src/components/buttons/pause_button';

export default function App() {
  const [time, setTime] = useState(300)
  const [running, setRunning] = useState(false);
  const [reseted, setReseted] = useState(false);

  const Reseting = () => {
    setReseted(true)
  }

  const Starting = () => {
    setRunning(true)
  }

  const Pausing = () => {
    setRunning(false)
  }

  return (
    <View style={styles.main}>
    <StatusBar style="light" />

      <Button
      initialSeconds={time}
      backgroundColor={"darkturquoise"}
      rotated={true}
      isRunning={running}
      isReseted={reseted}
      />

      <View style={styles.menu_style}>
        <Pause_Play/>
        <Reset OnReset={Reseting}/>
      </View>

      <Button
      initialSeconds={time}
      backgroundColor={"tomato"}
      rotated={false}
      isRunning={running}
      isReseted={reseted}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu_style: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 8,
    width: "100%",
    backgroundColor: "darkgray",
  },

});
