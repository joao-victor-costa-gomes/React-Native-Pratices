import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from "react";

import { FontAwesome } from '@expo/vector-icons';

export default function Pause_Play( {OnPause} ) {

    const[play, setPlay] = useState(false)

    const click_pause = () => {
      if(play){
        setPlay(false)
        OnPause()

      } else {
        setPlay(true)
        OnPause()

      } 
    };

  return (

    <View>
    <TouchableOpacity onPress={click_pause} >
          {play ? 
            
            <FontAwesome name="play" size={40} color="white"/>
            :
            <FontAwesome name="pause" size={40} color="white"/>
            
          }        
    </TouchableOpacity>
    </View>

  );
}