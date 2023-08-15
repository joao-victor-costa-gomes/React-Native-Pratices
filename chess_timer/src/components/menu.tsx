import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from "react";

import Button from './button';

//Menu icons 
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

export default function Menu() {

    const[play, setPlay] = useState(false)

  return (
    <View style={styles.menu_style}>

    {/*PLAY button and PAUSE button*/}
    <TouchableOpacity onPress={()=>{ play ? setPlay(false) : setPlay(true) }} >
          {play ? 
            
            <FontAwesome name="play" size={40} color="white" />
            :
            <FontAwesome name="pause" size={40} color="white" />
          }        
    </TouchableOpacity>

    {/*LOOP button*/}
    <TouchableOpacity>
        <Foundation name="loop" size={50} color="white" />
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  menu_style: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 8,
    width: "100%",
    backgroundColor: "darkgray",
  },

});
