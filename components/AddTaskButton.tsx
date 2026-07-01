import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Define TypeScript types for the props
interface AddTaskButtonPros {
  onPress: () => void;
}

const AddTaskButton = ({ onPress }: AddTaskButtonPros) => {
  return (
    <View>
      <TouchableOpacity style={styles.fab} onPress={onPress}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskButton;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#3D8B55",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});
