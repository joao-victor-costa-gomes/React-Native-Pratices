import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import { Audio } from 'expo-av';

import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

export default function App() {

  const time = 300; 

  const [seconds1, setSeconds1] = useState(time);
  const [running1, setRunning1] = useState(false);

  const [seconds2, setSeconds2] = useState(time);
  const [running2, setRunning2] = useState(false);

  const [background_color1, setBackgroundColor1] = useState("gray");
  const [background_color2, setBackgroundColor2] = useState("gray");

  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);

  const [paused1, setPaused1] = useState(false);
  const [paused2, setPaused2] = useState(false);

  const [moves1, setMoves1] = useState(0);
  const [moves2, setMoves2] = useState(0);

  const[play, setPlay] = useState(true)

  // Function to play sound 
  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/touch.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.error('Erro ao carregar o áudio:', error);
    }
  };
  
  // Increment 1 every time someone do a move 
  const add_move = (state, setState) => {
    setState(state + 1);
  };

  // Clear the moves 
  const clear_moves = () => {
    setMoves1(0)
    setMoves2(0)
  }

  // Start timer iteration [1] 
  const start_timer1 = () => {

      if (running1) {
        start_timer2()
        setClicked2(true)
        stop_timer1()
        setClicked1(false)

      } else {
        playSound()
        setBackgroundColor1("darkturquoise")
        setRunning1(true)
        setClicked1(true)
        add_move(moves1, setMoves1)
      }
  }

  // Stop timer iteration [1] 
  const stop_timer1 = () => {
    setBackgroundColor1("gray")
    setRunning1(false)
  }

  // Update timer every time 1 second elapses [1] 
  useEffect(() => {  

        let intervalId;

        if (running1 && seconds1 > 0) {
            intervalId = setInterval(() => {
                setSeconds1(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds1 === 0) {
            setRunning1(false);
            setBackgroundColor1("gray");
            //setSeconds1(300);
        }
        return () => {
            clearInterval(intervalId);
        };
    
}, [running1, seconds1]); // Every time this changes

// Start timer iteration [2] 
const start_timer2 = () => {

    if (running2){
      start_timer1()
      setClicked1(true)
      stop_timer2()
      setClicked2(false)

    } else {
      playSound()
      setBackgroundColor2("tomato")
      setRunning2(true)
      setClicked2(true)
      add_move(moves2, setMoves2)
    }
}

// Stop timer iteration [2] 
const stop_timer2 = () => {
  setBackgroundColor2("gray")
  setRunning2(false)
}

// Update timer every time 1 second elapses [2] 
useEffect(() => {  

      let intervalId;

      if (running2 && seconds2 > 0) {
          intervalId = setInterval(() => {
              setSeconds2(prevSeconds => prevSeconds - 1);
          }, 1000);
      } else if (seconds2 === 0) {
          setRunning2(false);
          setBackgroundColor2("gray");
          //setSeconds2(300);
      }
      return () => {
          clearInterval(intervalId);
      };
  
}, [running2, seconds2]); // Every time this changes

  // Change play/pause button icon and pause the 2 timers  
  const pause_play = () => {
    if (running1 || running2) {
      setRunning1(false);
      setRunning2(false);
      setPaused1(true)
      setPaused2(true)
      setPlay(false);
    } else {
      if (!running1 && !running2) {
        if (clicked1) {
          setRunning1(true);
          setPaused1(false)
          setPlay(true);
        } else if (clicked2) {
          setRunning2(true);
          setPaused2(false)
          setPlay(true);
        }
      }
    }
  };
  
  // Reset timer to initial seconds 
  const reset_timer = () => {

    setBackgroundColor1("gray");
    setSeconds1(time);
    setRunning1(false);
    setClicked1(false)

    setBackgroundColor2("gray");
    setSeconds2(time);
    setRunning2(false);
    setClicked2(false)

    setPaused1(false)
    setPaused2(false)

    clear_moves()

    setPlay(true)

  }
  
  // Format seconds to minutes and 00:00 format 
  const format_timer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // ALL STYLES
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
      backgroundColor: background_color1,
    },

    button_style2: {
      flex: 1,
      width: "100%",
      //flexDirection: "row",
      justifyContent: "space-around",
      alignItems: 'center',
      padding: 10,
      backgroundColor: background_color2,
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

    //MAIN VIEW
    <View style={styles.main}>
    <StatusBar style="light" />

      

      {/*timer button 01*/}
      <TouchableOpacity 
      style={styles.button_style1} 
      onPress={() => {
        if (!running2 && !paused1) { // Verify if button02 is not in execution
          start_timer1();
        }
      }}
      >
        <Text style={styles.undertext_hd}>Moves: {moves1}</Text>
        <Text style={styles.heads_down}>{format_timer(seconds1)}</Text>
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
        if (!running1 && !paused2) { // Verify if button01 is not in execution
          start_timer2();
        }
      }}
      >
        <Text style={styles.text_style}>{format_timer(seconds2)}</Text>
        <Text style={styles.undertext}>Moves: {moves2}</Text>
      </TouchableOpacity>
      
    </View>

  );
}
