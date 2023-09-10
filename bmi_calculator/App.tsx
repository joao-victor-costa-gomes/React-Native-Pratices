import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from "react";

export default function App() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(0);
  const [bmiLevel, setBmiLevel] = useState("don't know");

  const alert_notification = () => {
    if(weight == null || height == null){
      alert("PLEASE COMPLETE ALL REQUIRED FIELDS")
    }
  }

  return (
    <View style={styles.main}>
    <StatusBar hidden/>

    <View>
      <Text style={styles.title_style}>BMI CALCULATOR</Text>
    </View>

    <View style={styles.input_area}> 
      <Text style={styles.text_style}>
        YOUR WEIGHT: 
      </Text>

      <TextInput
        style={styles.input_style}
        onChangeText={text => setHeight(parseFloat(text))}
        value={weight.toString()}
        placeholder='Your height in meters'
      />
    </View>

    <View style={styles.input_area}>
      <Text style={styles.text_style}>
        YOUR WEIGHT: 
      </Text>

      <TextInput
        style={styles.input_style}
        onChangeText={text => setWeight(parseFloat(text))}
        value={weight.toString()}
        placeholder='Your weight in kilograms'
      />
    </View>

    <TouchableOpacity style={styles.button_style}>
      <Text style={styles.button_text}>
        CALCULATE
      </Text>
    </TouchableOpacity>

    <Text style={styles.text_style}>
      YOUR IBM IS: {bmi}
      {'\n'} 
      LEVEL: {bmiLevel}
    </Text>

    
    </View>
  );
}

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: 'darkturquoise',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title_style: {
    fontSize: 40, 
    color: "white", 
    fontWeight: "bold", 
    padding: 8, 
    margin: 10, 
  },

  text_style: {
    fontSize: 20, 
    color: "white", 
    fontWeight: "bold", 
  }, 

  input_style: {
    borderWidth: 1,
    borderColor: "white", 
    fontSize: 15, 
    backgroundColor: "white",
    width: 200, 
    padding: 8, 
    margin: 10,  
  },

  input_area: { 
    flexDirection: "row", 
    alignItems: "center",  
  }, 

  button_style: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    width: 350,
    padding: 15, 
    margin: 10, 
    borderRadius: 50,
  },

  button_text: {
    fontSize: 20,  
    fontWeight: "bold", 
    color: "gray", 
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
  }

});
