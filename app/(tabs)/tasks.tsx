import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AddTaskButton from "@/components/AddTaskButton";
import { useTask } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { Task } from "@/types/task";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskCard from "../../components/TaskCard";
import TaskModal from "../../components/TaskModal";

export default function Tasks() {
  const { taskList, fetchTasks, createTask, updateTask, deleteTask, searchTask } = useTask();

  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [modalVisible, setModalVisible] = useState(false);


  const { theme } = useTheme();
  const styles = getStyle(theme);

  const handleDelete = async (id: any) => {
    console.log("Delete Id :-", id)
    await deleteTask(id);
    await fetchTasks();
  };

  const handleEdit = (id: string, task: any) => {
    // Open edit modal
    setMode("edit");
    setSelectedTask(task);
    setModalVisible(true);
    console.log("Edit Id :-", id)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("API Calling")
      searchTask(search, filter);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, filter]);

  console.log("TASK IN TASKS TAB :-",taskList)
  const toggleTask = async (id: string, task: any) => {
    console.log("Toggle");

    await updateTask(id, {
      ...task,
      completed: !task.completed,
    });

    await fetchTasks();
  };

  const showTaskDetail = (task: Task) => {
    setMode("view");
    setSelectedTask(task);
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>Tasks</Text>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color="#3D8B55" />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      {/* FILTER */}
      <View style={styles.tabs}>
        {["All", "Pending", "Completed"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item as any)}
            style={[styles.tab, filter === item && styles.activeTab]}
          >
            <Text
              style={[styles.tabText, filter === item && styles.activeTabText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() => toggleTask(item._id, item)}
            onDelete={() => handleDelete(item._id)}
            onEdit={() => handleEdit(item._id, item)}
            showTaskDetail={showTaskDetail}
          />
        )}
      />

      {/* FLOATING BUTTON */}
      <AddTaskButton
        onPress={() => {
          setMode("create");
          setSelectedTask(null);
          setModalVisible(true);
        }}
      />

      {/* MODAL (NOW CALLS API THROUGH CONTEXT) */}
      <TaskModal
        visible={modalVisible}
        mode={mode}
        onClose={() => setModalVisible(false)}
        task={selectedTask}
        onSubmitTask={async (data) => {
          if (selectedTask) {
            await updateTask(selectedTask._id, data);
          } else {
            await createTask(data);
          }

          await fetchTasks();
          setSelectedTask(null);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const getStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 18,
      paddingTop: 10,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    heading: {
      fontSize: 34,
      fontWeight: "700",
      color: theme.text,
    },

    filterButton: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: theme.card,
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
    },

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.card,
      borderRadius: 14,
      paddingHorizontal: 15,
      height: 52,
      marginBottom: 18,
      elevation: 2,
    },

    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: theme.text
    },

    tabs: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    tab: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme.card,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 4,
    },

    activeTab: {
      backgroundColor: theme.primary,
    },

    tabText: {
      color: theme.textSecondary,
      fontWeight: "600",
    },

    activeTabText: {
      color: "#fff",
    },
    
    taskMeta: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
  });
