import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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

export type TaskPayload = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  dueDate: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: TaskPayload) => void;
};

export default function TaskModal({ visible, onClose, onAddTask }: Props) {
  // ✅ FIXED: missing states added
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Study");

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Study");
    setDate(new Date());
    setPriority("Medium");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAdd = () => {
    if (!title.trim()) return;

    const task: TaskPayload = {
      title,
      description,
      category,
      priority,
      dueDate: date.toISOString().split("T")[0], // YYYY-MM-DD
    };

    onAddTask(task);

    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.wrapper}>
        <Pressable style={styles.overlay} onPress={handleClose} />

        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>Create Task</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={26} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            style={styles.input}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            style={[styles.input, { height: 80 }]}
            multiline
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Study / Work / Personal"
            style={styles.input}
          />

          {/* Due Date */}
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDate(true)}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(e, selectedDate) => {
                setShowDate(false);
                if (selectedDate) setDate(selectedDate);
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

          {/* Submit */}
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Create Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: "flex-end" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heading: { fontSize: 20, fontWeight: "700" },
  label: { marginTop: 10, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  priorityRow: { flexDirection: "row", marginTop: 10 },
  priorityButton: {
    flex: 1,
    padding: 10,
    margin: 4,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  activePriority: { backgroundColor: "#3D8B55" },
  priorityText: { color: "#333" },
  activePriorityText: { color: "#fff" },
  button: {
    marginTop: 20,
    backgroundColor: "#3D8B55",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
