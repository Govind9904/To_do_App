import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetStarterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          color="#620370"
          onPress={() => router.replace("/(tabs)/home")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "80%",
  },
});
