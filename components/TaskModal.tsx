import { useTheme } from "@/context/ThemeContext";
import { Task } from "@/types/task";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
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
  onSubmitTask: (task: TaskPayload) => void;
  task?: Task | null;
  mode: "create" | "edit" | "view";
};

export default function TaskModal({
  visible,
  onClose,
  onSubmitTask,
  task,
  mode,
}: Props) {
  // ✅ FIXED: missing states added
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Study");

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  // console.log("Mode",mode)

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

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setCategory(task.category ?? "Study");
      setPriority(task.priority ?? "Medium");
      setDate(task.dueDate ? new Date(task.dueDate) : new Date());
    } else {
      resetForm();
    }
  }, [task, visible]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const payload: TaskPayload = {
      title,
      description,
      category,
      priority,
      dueDate: date.toISOString().split("T")[0],
    };

    onSubmitTask(payload);

    resetForm();
    onClose();
  };

  const { theme } = useTheme();
  const styles = getStyle(theme);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.wrapper}>
        <Pressable style={styles.overlay} onPress={handleClose} />

        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>
              {mode === "create"
                ? "Create Task"
                : mode === "edit"
                  ? "Edit Task"
                  : "Task Details"}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={26} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            editable={mode !== "view"}
            style={styles.input}
            placeholderTextColor={theme.text}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            editable={mode !== "view"}
            style={[styles.input, { height: 80 }]}
            multiline
            placeholderTextColor={theme.text}
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Study / Work / Personal"
            editable={mode !== "view"}
            style={styles.input}
            placeholderTextColor={theme.text}
          />

          {/* Due Date */}
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={styles.input}
            disabled={mode === "view"}
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
                disabled={mode === "view"}
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
          {mode === "view" ? (
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {mode === "edit" ? "Update Task" : "Create Task"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const getStyle = (theme: any) =>
  StyleSheet.create({
    wrapper: { flex: 1, justifyContent: "flex-end" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
    sheet: {
      backgroundColor: theme.card,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 22,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    heading: { fontSize: 20, fontWeight: "700", color: theme.text },
    label: { marginTop: 10, fontWeight: "600", color: theme.text },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      padding: 12,
      borderRadius: 10,
      marginTop: 5,
      backgroundColor: theme.input,
      color: theme.text,
    },
    priorityRow: { flexDirection: "row", marginTop: 10 },
    priorityButton: {
      flex: 1,
      padding: 10,
      margin: 4,
      backgroundColor: theme.border,
      borderRadius: 8,
      alignItems: "center",
    },
    activePriority: { backgroundColor: "#3D8B55" },
    priorityText: { color: theme.text },
    activePriorityText: { color: "#fff" },
    button: {
      marginTop: 20,
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 12,
      alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "700" },
  });
