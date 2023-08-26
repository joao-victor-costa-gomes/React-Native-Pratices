import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.main}>
    <StatusBar hidden/>

    <View>
      <Text style={styles.title_text}>BMI CALCULATOR</Text>
    </View>

      
    </View>
  );
}

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title_text: {
    fontSize: 40, 
    fontWeight: "bold", 
  }

});
