import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from "react";

import { Foundation } from '@expo/vector-icons'; 

export default function Reset( {OnReset} ) {

  return (

    <View>
    <TouchableOpacity onPress={OnReset}>
        <Foundation name="loop" size={50} color="white" />
    </TouchableOpacity>
    </View>

  );
}
