import React, { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: {
    id: number;
    title: string;
    time: string;
    completed: boolean;
  }) => void;
};

export default function TaskModal({ visible, onClose, onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      title,
      time,
      completed: false,
    });

    setTitle("");
    setTime("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.sheet}>
        <Text style={styles.heading}>Add Task</Text>

        <TextInput
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="Time"
          value={time}
          onChangeText={setTime}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#3D8B55",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
