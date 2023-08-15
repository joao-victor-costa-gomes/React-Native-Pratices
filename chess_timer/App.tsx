import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";

import Menu from './src/components/menu';
import Button from './src/components/button';

export default function App() {



  return (
    <View style={styles.main}>
    <StatusBar style="light" />

      <Button
      initialSeconds={10}
      backgroundColor={"darkturquoise"}
      rotated={true}
      />

      <Menu></Menu>

      <Button
      initialSeconds={10}
      backgroundColor={"tomato"}
      rotated={false}
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
});
