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
import TaskModal, { TaskPayload } from "../../components/TaskModal";

export default function Tasks() {
  const { taskList, fetchTasks, createTask } = useTask();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  const [modalVisible, setModalVisible] = useState(false);

  const formatDate = (date?: string) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const handleDelete = async (id: any) => {
    // Delete API
  };

  const handleEdit = (id: any) => {
    // Open edit modal
    // setSelectedTask(task);
    // setEditModalVisible(true);
  };

  // FILTERED DATA (pure UI logic only)
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

  // ❌ IMPORTANT: toggle should be API-based (if backend supports it)
  // If you don't have API yet, keep this commented
  const toggleTask = async (id: string) => {
    console.log("Toggle should call API here:", id);
    // later: await updateTask(id)
    // then: fetchTasks()
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
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() => toggleTask(item._id)}
            onDelete={() => handleDelete(item._id)}
            onEdit={() => handleEdit(item._id)}
          />
        )}
      />

      {/* FLOATING BUTTON */}
      <AddTaskButton onPress={() => setModalVisible(true)} />

      {/* MODAL (NOW CALLS API THROUGH CONTEXT) */}
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={async (task: TaskPayload) => {
          await createTask(task); // ✅ API CALL
          fetchTasks(); // refresh list
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
