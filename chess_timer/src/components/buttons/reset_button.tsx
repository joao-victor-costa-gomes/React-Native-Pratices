import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";

import { Foundation } from '@expo/vector-icons'; 

export default function Reset( {OnReset}) {

  const click_reset = () => {
    OnReset(); 
  };

  return (

    <View>
    <TouchableOpacity onPress={click_reset}>
        <Foundation name="loop" size={50} color="white" />
    </TouchableOpacity>
    </View>

  );
}