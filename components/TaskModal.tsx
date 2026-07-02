import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
<<<<<<< HEAD
  Platform,
=======
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
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
<<<<<<< HEAD
=======
  // ✅ FIXED: missing states added
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Study");

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
<<<<<<< HEAD
=======

>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
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
<<<<<<< HEAD
            <Text style={styles.heading}>Add New Task</Text>

=======
            <Text style={styles.heading}>Create Task</Text>
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={26} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Title */}
<<<<<<< HEAD

          <Text style={styles.label}>Task Title</Text>

=======
          <Text style={styles.label}>Title</Text>
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
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

<<<<<<< HEAD
          <Text style={styles.label}>Due Date</Text>
=======
          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Study / Work / Personal"
            style={styles.input}
          />
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)

          {/* Due Date */}
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDate(true)}
          >
<<<<<<< HEAD
            <Text style={styles.dateText}>
              {date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
=======
            <Text>{date.toDateString()}</Text>
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
<<<<<<< HEAD
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
=======
              onChange={(e, selectedDate) => {
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
                setShowDate(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* Priority */}
<<<<<<< HEAD

          <Text style={styles.label}>Priority</Text>

=======
          <Text style={styles.label}>Priority</Text>
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
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

<<<<<<< HEAD
          {/* Button */}

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Task</Text>
=======
          {/* Submit */}
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Create Task</Text>
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

=======
  wrapper: { flex: 1, justifyContent: "flex-end" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
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
<<<<<<< HEAD

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
=======
  buttonText: { color: "#fff", fontWeight: "700" },
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
});
