import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {handlePress} from './BLELogic.js'

const PruebaBleIntegracion = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.button}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    maxWidth:100,
    paddingHorizontal:10,
    borderColor:"lightblue",
    borderStyle: 'solid',
    borderRadius: 5,
    fontSize: 20,
  },
  container: {
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
AppRegistry.registerComponent(
  'MyReactNativeApp',
  () => PruebaBleIntegracion,
);