import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tasks } from "../data/task";
import TaskModal from "./modal";

export default function Home() {
  const [taskList, setTaskList] = useState(tasks);
  const [modalVisible, setModalVisible] = useState(false);

  const today = new Date();

  const dateString = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const weekdayName = today.toLocaleDateString("en-GB", {
    weekday: "long",
  });

  const formattedDateTime = `${dateString}, ${weekdayName}`;

  const totalTask = taskList.length;

  const completedTask = taskList.filter((task) => task.completed).length;

  const pendingTask = totalTask - completedTask;

  const progressRate = Math.round((completedTask / totalTask) * 100);

  const toggleTask = (id: number) => {
    setTaskList((prev) => {
      return prev.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      });
    });
  };

  const addTask = (task: any) => {
    setTaskList((prev) => [...prev, task]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>

            <Text style={styles.name}>
              Admin <Text style={styles.wave}>☀️</Text>
            </Text>

            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={15} color="#6B7280" />

              <Text style={styles.date}>{formattedDateTime}</Text>
            </View>
          </View>

          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />
        </View>

        {/* STATISTICS */}

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{totalTask}</Text>
            <Text style={styles.cardTitle}>Total Tasks</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardValue}>{completedTask}</Text>
            <Text style={styles.cardTitle}>Completed</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardValue}>{pendingTask}</Text>
            <Text style={styles.cardTitle}>Pending</Text>
          </View>
        </View>

        {/* PROGRESS */}

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Great Progress!</Text>

            <Text style={styles.progressPercent}>{progressRate}%</Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressRate}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {completedTask} of {totalTask} tasks completed
          </Text>
        </View>

        {/* TODAY TASKS */}

        <ScrollView style={styles.taskContainer}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskHeading}>Today's Tasks</Text>

            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {taskList.map((task) => (
            <View key={task.id}>
              <TouchableOpacity
                onPress={() => toggleTask(task.id)}
                style={styles.taskItem}
              >
                <Ionicons
                  name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={task.completed ? "#4CAF50" : "#999"}
                />
                <Text
                  style={[
                    styles.taskName,
                    task.completed && styles.completedTask,
                  ]}
                >
                  {task.title}
                </Text>

                <Text style={styles.taskTime}>{task.time}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* FLOATING BUTTON */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={addTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F3",
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  greeting: {
    fontSize: 18,
    color: "#8B8B8B",
  },

  name: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1F5E46",
    marginTop: 4,
  },

  wave: {
    fontSize: 28,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#3D8B55",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  date: {
    marginLeft: 6,
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 40,
  },

  card: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,
  },

  cardValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F5E46",
  },

  cardTitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 6,
  },

  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  progressTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#555",
  },

  progressPercent: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E8B57",
  },

  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    width: "67%",
    height: "100%",
    backgroundColor: "#3D8B55",
    borderRadius: 10,
  },

  progressText: {
    marginTop: 10,
    color: "#777",
    fontSize: 13,
  },

  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  taskHeading: {
    fontSize: 19,
    fontWeight: "700",
    color: "#333",
  },

  viewAll: {
    color: "#888",
    fontWeight: "600",
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  taskName: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },

  taskTime: {
    color: "#888",
    fontSize: 14,
  },

  fab: {
    position: "absolute",
    right: 22,
    bottom: 30,
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

  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
