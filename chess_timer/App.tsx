import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import { Audio } from 'expo-av';

import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

export default function App() {

  // Timer minutes in seconds 
  const time = 600; 

  // This is for the play/pause button icon 
  const[play, setPlay] = useState(true)

  // Create a timer constructor  
  const create_timer = (id, color) => ({
    seconds: time,
    running: false,
    background_color: "gray",
    changed_color: color, 
    clicked: false,
    paused: false,
    moves: 0,
    id: id,
  });

  // Create 2 objects timer 
  const timer1 = create_timer(1, "darkturquoise");
  const timer2 = create_timer(2, "tomato");

  // Start timer iteration [1] 
  const start_timer = (t1, t2) => {

    const timer1 = t1
    const timer2 = t2

      if (timer1.running) {
        start_timer(t2, t1)
        timer2.clicked = true
        stop_timer(timer1)
        timer1.clicked = false

      } else {
        playSound()
        timer1.background_color = timer1.changed_color
        timer1.running = true
        timer1.clicked = true 
        add_move(timer1)
        
      }
  }

  // Stop timer iteration
  const stop_timer = (timer) => {
    timer.background_color = 'gray'
    timer.running = false 
  }
 
  // Update timer every time 1 second elapses [1] 
  useEffect(() => {  

        let intervalId;

        if (timer1.running && timer1.seconds > 0) {
            intervalId = setInterval(() => {
                timer1.seconds = timer1.seconds - 1;
            }, 1000);
        } else if (timer1.seconds === 0) {
            stop_timer(timer1)
        }
        return () => {
            clearInterval(intervalId);
        };
    
}, [timer1.running, timer1.seconds]); // Every time this changes

  // Update timer every time 1 second elapses [2] 
  useEffect(() => {  

    let intervalId;

    if (timer2.running && timer2.seconds > 0) {
        intervalId = setInterval(() => {
            timer2.seconds = timer2.seconds - 1;
        }, 1000);
    } else if (timer2.seconds === 0) {
        stop_timer(timer2)
    }
    return () => {
        clearInterval(intervalId);
    };

}, [timer2.running, timer2.seconds]); // Every time this changes

  const pause_timers = () => {
    timer1.paused = true 
    timer2.paused = true 
  }

  const unpause_timers = () => {
    timer1.paused = false 
    timer2.paused = false
  }

  // Change play/pause button icon and pause the 2 timers  
  const pause_play = () => {
    if (timer1.running || timer2.running) {
      pause_timers()
      timer1.running = false 
      timer2.running = false  
      setPlay(false);
    } else {
      if (!timer1.running && !timer2.running) {
        if (timer1.clicked) {
          timer1.running = true
          unpause_timers()
          setPlay(true)
        } else if (timer2.clicked) {
          timer2.running = true
          unpause_timers()
          setPlay(true)
        }
      }
    }
  };

  // Reset timer to initial seconds 
  const reset_timer = (timer) => {
    timer.background_color = 'gray'
    timer.seconds = time 
    timer.running = false 
    timer.clicked = false  
    timer.paused = false
    clear_moves(timer)
    setPlay(true) 
  }
  
  // Format seconds to minutes and 00:00 format 
  const format_timer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Function to play sound 
  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/touch.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.error("Error: Can't load the audio. ", error);
    }
  };
  
  // Increment 1 every time someones round 
  const add_move = (timer) => {
    timer.moves = timer.moves + 1 
  };

  // Clear the moves 
  const clear_moves = (timer1) => {
    timer1.moves = 0 
  }

  // ALL STYLES *
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
  
    button_style1: {
      flex: 1,
      width: "100%",
      //flexDirection: "row",
      justifyContent: "space-around",
      alignItems: 'center',
      padding: 10,
      backgroundColor: timer1.background_color,
    },

    button_style2: {
      flex: 1,
      width: "100%",
      //flexDirection: "row",
      justifyContent: "space-around",
      alignItems: 'center',
      padding: 10,
      backgroundColor: timer2.background_color,
    },
  
    text_style: {
        fontSize: 80,
        color: "white",
        fontWeight: "bold",
    },
  
    heads_down: {
        fontSize: 80,
        color: "white",
        fontWeight: "bold",
        transform: [{ rotate: '180deg' }],
    },

    undertext: {
      fontSize: 22,
      color: "white",
      fontWeight: "bold",
    },

    undertext_hd: {
      fontSize: 22,
      color: "white",
      fontWeight: "bold",
      transform: [{ rotate: '180deg' }],
    },
  });
  
  return (

    // MAIN VIEW * 
    <View style={styles.main}>
    <StatusBar style="light" />

      {/*timer button 01*/}
      <TouchableOpacity 
      style={styles.button_style1} 
      onPress={() => {
        if (timer2.running==false && timer1.paused==false) { // Verify if button02 is not in execution
          start_timer(timer1, timer2);
        }
      }}
      >
        <Text style={styles.undertext_hd}>Move: {timer1.moves}</Text>
        <Text style={styles.heads_down}>{format_timer(timer1.seconds)}</Text>
      </TouchableOpacity>


      {/*MENU VIEW*/}
      <View style={styles.menu_style}> 

        {/*pause and play button*/}
        <View>
          <TouchableOpacity onPress={pause_play} >
            {play ? 
              <FontAwesome name="pause" size={40} color="white"/>
              :
              <FontAwesome name="play" size={40} color="white"/>
            }        
          </TouchableOpacity>
        </View>

        {/*reset timer*/}
        <View>
          <TouchableOpacity onPress={reset_timer}>
            <Foundation name="loop" size={50} color="white" />
          </TouchableOpacity>
        </View>

      </View>

      {/*timer button 02*/}
      <TouchableOpacity 
      style={styles.button_style2} 
      onPress={() => {
        if (timer1.running==false && timer2.paused==false) { // Verify if button01 is not in execution
          start_timer(timer2, timer1);
        }
      }}
      >
        <Text style={styles.text_style}>{format_timer(timer2.seconds)}</Text>
        <Text style={styles.undertext}>Move: {timer2.moves}</Text>
      </TouchableOpacity>
      
    </View>

  );
}
