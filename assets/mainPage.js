import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { database } from "./firebaseConfig";
import { ref, set } from "firebase/database";

const MainPage = () => {
  const [tracking, setTracking] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required to track location."
      );
      return false;
    }
    return true;
  };

  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    setTracking(true);

    // Start watching location
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // Update every second
        distanceInterval: 1, // Update if the device moves 1 meter
      },
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Update Firebase Realtime Database
        const locationRef = ref(database, "driverLocation");
        set(locationRef, {
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        }).catch((error) => {
          console.error("Error updating Firebase:", error);
        });
      }
    );
  };

  const stopTracking = () => {
    setTracking(false);
    setLocation({ latitude: null, longitude: null });

    // Optionally clear Firebase location data
    const locationRef = ref(database, "driverLocation");
    set(locationRef, null).catch((error) => {
      console.error("Error clearing Firebase data:", error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vroom Vroom </Text>
      <View style={styles.locationBox}>
        <Text style={styles.label}>Current Location:</Text>
        {location.latitude && location.longitude ? (
          <Text style={styles.location}>
            Latitude: {location.latitude.toFixed(6)}
            {"\n"}
            Longitude: {location.longitude.toFixed(6)}
          </Text>
        ) : (
          <Text style={styles.location}>
            {tracking ? "Fetching location..." : "Location not available"}
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            tracking ? styles.disabledButton : styles.startButton,
          ]}
          onPress={startTracking}
          disabled={tracking}
        >
          <Text style={styles.buttonText}>Start Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !tracking ? styles.disabledButton : styles.stopButton,
          ]}
          onPress={stopTracking}
          disabled={!tracking}
        >
          <Text style={styles.buttonText}>End Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  locationBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 30,
    width: "80%",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#4CAF50",
  },
  stopButton: {
    backgroundColor: "#f44336",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainPage;
