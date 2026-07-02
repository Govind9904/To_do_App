import AddTaskButton from "@/components/AddTaskButton";
import { useTask } from "@/context/TaskContext";
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
import TaskModal, { TaskPayload } from "../../components/TaskModal";

export default function Home() {
  const { taskList, fetchTasks, createTask, loading, status, error } =
    useTask();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const totalTask = taskList.length;
  const completedTask = taskList.filter((t) => t.completed).length;
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
          <Text style={styles.progressText}>{progressRate}% Completed</Text>

          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progressRate}%` }]}
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
        onClose={() => setModalVisible(false)}
        onAddTask={async (task: TaskPayload) => {
          // ✅ create task in backend
          await createTask(task);

          // ✅ refresh list
          fetchTasks();

          // ✅ close modal
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F3",
    paddingHorizontal: 18,
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },

  greeting: {
    fontSize: 14,
    color: "#777",
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F5E46",
  },

  date: {
    marginTop: 4,
    color: "#666",
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
    backgroundColor: "#fff",
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2,
  },

  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F5E46",
  },

  cardTitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  progressCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 1,
  },

  progressText: {
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 13,
  },

  progressBar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#3D8B55",
    borderRadius: 10,
  },

  taskContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  taskMeta: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  completed: {
    textDecorationLine: "line-through",
    color: "#999",
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
});
