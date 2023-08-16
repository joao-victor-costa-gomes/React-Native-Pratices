import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from "react";

import { FontAwesome } from '@expo/vector-icons';

export default function Pause_Play() {

    const[play, setPlay] = useState(false)

  return (

    <View>
    <TouchableOpacity onPress={()=>{ play ? setPlay(false) : setPlay(true) }} >
          {play ? 
            
            <FontAwesome name="play" size={40} color="white" />
            :
            <FontAwesome name="pause" size={40} color="white" />
          }        
    </TouchableOpacity>
    </View>

  );
}
