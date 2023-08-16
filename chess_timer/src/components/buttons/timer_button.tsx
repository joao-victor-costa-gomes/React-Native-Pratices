import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Button = ({ 
    initialSeconds, 
    backgroundColor, 
    rotated, 
    isRunning, 
    isReseted, 
}) => {

    const [seconds, setSeconds] = useState(initialSeconds);
    const [background_color, setBackgroundColor] = useState("gray");
    const [running, setRunning] = useState(isRunning);
    const [reseted, setReseted] = useState(isReseted);

    // Function to update timer 
    useEffect(() => {
        let intervalId;
        if (running && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setRunning(false);
            setBackgroundColor("gray")
        }
        return () => {
            clearInterval(intervalId);
        };
    },[running, seconds, reseted]); // Constantly update?

    const startTimer = () => {

        if (reseted) {
            resetTimer()
        } 

        if (running) {
            stopTimer()
            
        } else {
            setBackgroundColor(backgroundColor)
            setRunning(true);
        }
    };

    // Stop timer incremetation 
    const stopTimer = () => {
        setBackgroundColor("gray")
        setRunning(false);
    };

    // Reset timer to the inital seconds 
    const resetTimer = () => {
        setBackgroundColor("gray");
        setSeconds(initialSeconds);
        setRunning(false);
        setReseted(false)
    };

    // Format timer to 00:00 
    const formatTimer = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const styles = StyleSheet.create({
        buttonStyle: {
            flex: 1,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: 'center',
            padding: 10,
            backgroundColor: background_color,
            
        },
    
        textStyle: {
            fontSize: 70,
            color: "white",
            fontWeight: "bold",
        },
    
        headsDown: {
            fontSize: 70,
            color: "white",
            fontWeight: "bold",
            transform: [{ rotate: '180deg' }],
        },
    });

    return (
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={startTimer}
            >
                <Text style={rotated ? styles.headsDown : styles.textStyle}>
                    {formatTimer(seconds)}
                </Text>
            </TouchableOpacity>
    );

}
export default Button;
