import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [tracking, setTracking] = useState(false);
  const [location, setLocation] = useState(null);

  const startTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to track.');
      return;
    }

    setTracking(true);
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
      (loc) => {
        setLocation(loc.coords);
      }
    );
  };

  const endTracking = () => {
    setTracking(false);
    setLocation(null);
    Alert.alert('Tracking Stopped', 'Location tracking has been stopped.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track App</Text>
      <View style={styles.locationContainer}>
        {location ? (
          <>
            <Text style={styles.label}>Current Location:</Text>
            <Text style={styles.location}>
              Latitude: {location.latitude}
            </Text>
            <Text style={styles.location}>
              Longitude: {location.longitude}
            </Text>
          </>
        ) : (
          <Text style={styles.label}>No location data available</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, tracking ? styles.disabledButton : styles.startButton]}
          onPress={startTracking}
          disabled={tracking}
        >
          <Text style={styles.buttonText}>Start Track</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !tracking ? styles.disabledButton : styles.stopButton]}
          onPress={endTracking}
          disabled={!tracking}
        >
          <Text style={styles.buttonText}>End Track</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50', // Green
  },
  stopButton: {
    backgroundColor: '#f44336', // Red
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
