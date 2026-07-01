import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type Task = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
};

export default function TaskModal({ visible, onClose, onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const resetForm = () => {
    setTitle("");
    setDate(new Date());
    setPriority("Medium");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAdd = () => {
    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      title,
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      completed: false,
      priority,
    });

    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.wrapper}>
        <Pressable style={styles.overlay} onPress={handleClose} />

        <View style={styles.sheet}>
          {/* Header */}

          <View style={styles.header}>
            <Text style={styles.heading}>Add New Task</Text>

            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={26} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Title */}

          <Text style={styles.label}>Task Title</Text>

          <TextInput
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          {/* Date */}

          <Text style={styles.label}>Due Date</Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDate(true)}
          >
            <Text style={styles.dateText}>
              {date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDate(false);

                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          {/* Priority */}

          <Text style={styles.label}>Priority</Text>

          <View style={styles.priorityRow}>
            {(["High", "Medium", "Low"] as const).map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setPriority(item)}
                style={[
                  styles.priorityButton,
                  priority === item && styles.activePriority,
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === item && styles.activePriorityText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Button */}

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    marginTop: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 14,
    paddingHorizontal: 15,
    justifyContent: "center",
    fontSize: 16,
    marginBottom: 16,
  },

  dateText: {
    fontSize: 16,
    color: "#333",
  },

  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  priorityButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },

  activePriority: {
    backgroundColor: "#3D8B55",
  },

  priorityText: {
    color: "#555",
    fontWeight: "600",
  },

  activePriorityText: {
    color: "#fff",
  },

  button: {
    height: 55,
    backgroundColor: "#3D8B55",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
