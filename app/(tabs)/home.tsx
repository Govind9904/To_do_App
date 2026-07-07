import { updateTask } from "@/api/taskApi";
import AddTaskButton from "@/components/AddTaskButton";
import { useTask } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskModal from "../../components/TaskModal";

export default function Home() {
  const { taskList, fetchTasks, createTask, loading, status, error } =
    useTask();
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = new Date();

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  // console.log("TASK LIST", taskList)

  const totalTask = taskList.length;
  const completedTask = taskList.filter((t) => t?.completed).length;
  const pendingTask = totalTask - completedTask;

  const progressRate =
    totalTask === 0 ? 0 : Math.round((completedTask / totalTask) * 100);

  const formatDate = (date?: string) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#E53935";
      case "Medium":
        return "#FB8C00";
      case "Low":
        return "#43A047";
      default:
        return "#999";
    }
  };

  // UI STATES
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ marginTop: 50 }}>Loading tasks...</Text>
      </SafeAreaView>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "red", marginTop: 50 }}>
          {error || "Something went wrong"}
        </Text>

        <TouchableOpacity onPress={fetchTasks}>
          <Text style={{ marginTop: 20, color: "#3D8B55" }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.name}>Admin ☀️</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>

          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
        </View>

        {/* STATS */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{totalTask}</Text>
            <Text style={styles.cardTitle}>Total</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardValue}>{completedTask}</Text>
            <Text style={styles.cardTitle}>Done</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardValue}>{pendingTask}</Text>
            <Text style={styles.cardTitle}>Pending</Text>
          </View>
        </View>

        {/* PROGRESS */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progress</Text>

            <Text style={styles.progressText}>{progressRate}% Completed</Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progressRate, 100)}%` },
              ]}
            />
          </View>
        </View>

        {/* TASK LIST */}
        <ScrollView style={styles.taskContainer}>
          <Text style={styles.sectionTitle}>Tasks</Text>

          {taskList.length === 0 ? (
            <Text style={{ marginTop: 20, color: "#888" }}>No tasks found</Text>
          ) : (
            taskList.map((task) => (
              <TouchableOpacity key={task._id} style={styles.taskItem}>
                <Ionicons
                  name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={task.completed ? "#3D8B55" : "#999"}
                  onPress={async () => {
                    await updateTask(task._id, {
                      completed: !task.completed,
                    });

                    await fetchTasks();
                  }}
                />

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.completed,
                    ]}
                  >
                    {task.title}
                  </Text>

                  <Text style={styles.taskMeta}>
                    {task.category} • {formatDate(task.dueDate)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(task.priority) },
                  ]}
                >
                  <Text style={styles.priorityText}>{task.priority}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      {/* FLOATING BUTTON */}
      <AddTaskButton onPress={() => setModalVisible(true)} />

      {/* MODAL */}
      <TaskModal
        visible={modalVisible}
        mode={mode}
        onClose={() => setModalVisible(false)}
        onSubmitTask={async (task) => {
          await createTask(task);
          await fetchTasks(); // IMPORTANT await
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 18,
    },

    content: {
      flex: 1,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      alignItems: "center",
    },

    greeting: {
      fontSize: 14,
      color: theme.textSecondary,
    },

    name: {
      fontSize: 26,
      fontWeight: "700",
      color: theme.secondary,
    },

    date: {
      marginTop: 4,
      color: theme.textSecondary,
      fontSize: 13,
    },

    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },

    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
    },

    card: {
      flex: 1,
      backgroundColor: theme.card,
      paddingVertical: 14,
      marginHorizontal: 4,
      borderRadius: 14,
      alignItems: "center",
      elevation: 2,
    },

    cardValue: {
      fontSize: 40,
      fontWeight: "700",
      color: theme.primary,
    },

    cardTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.textSecondary,
    },

    taskContainer: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 14,
      padding: 14,
    },

    sectionTitle: {
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 10,
      color: theme.text,
    },

    taskItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },

    taskTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
    },

    taskMeta: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },

    completed: {
      textDecorationLine: "line-through",
      color: theme.textSecondary,
    },

    priorityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginLeft: 8,
    },

    priorityText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "600",
    },

    flex: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    progressCard: {
      backgroundColor: theme.card,
      borderRadius: 20,
      paddingVertical: 22,
      paddingHorizontal: 20,
      marginBottom: 18,
      elevation: 2,
    },

    progressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
    },

    progressTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
    },

    progressText: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.textSecondary,
    },

    progressBar: {
      height: 10,
      backgroundColor: theme.border,
      borderRadius: 10,
      overflow: "hidden",
    },

    progressFill: {
      height: "100%",
      borderRadius: 10,
      backgroundColor: theme.primary,
    },
  });
