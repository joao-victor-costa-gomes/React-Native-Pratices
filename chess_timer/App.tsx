import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";

import Menu from './src/components/menu';
import { Button01, Button02 } from './src/components/button';

export default function App() {
  return (
    <View style={styles.main}>
    <StatusBar style="light" />

      <Button01></Button01>

      <Menu></Menu>

      <Button02></Button02>

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
