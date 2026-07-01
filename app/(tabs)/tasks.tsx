import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import TaskCard from "../../components/TaskCard";
import TaskModal from "../../components/TaskModal";

export type Task = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
};

export default function Tasks() {
  const { taskList, setTaskList } = useTask();

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  const [modalVisible, setModalVisible] = useState(false);

  const filteredTasks = useMemo(() => {
    let data = [...taskList];

    if (filter === "Pending") {
      data = data.filter((item) => !item.completed);
    }

    if (filter === "Completed") {
      data = data.filter((item) => item.completed);
    }

    if (search.trim()) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [taskList, search, filter]);

  const toggleTask = (id: number) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    );
  };

  const addTask = (task: any) => {
    setTaskList((prev) => [...prev, task]);
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
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <TaskCard task={item} onToggle={() => toggleTask(item.id)} />
        )}
      />

      {/* FAB */}

      <AddTaskButton onPress={() => setModalVisible(true)} />

      {/* MODAL */}

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
    color: "#222",
  },

  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },

  activeTab: {
    backgroundColor: "#3D8B55",
  },

  tabText: {
    color: "#666",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#fff",
  },
});
