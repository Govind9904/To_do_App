
import { useTheme } from "@/context/ThemeContext";
import { Task } from "@/types/task";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
  showTaskDetail : (task : Task) => void;
};

const formatDate = (date?: string) => {
  if (!date) return "No due date";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};



export default function TaskCard({ task, onToggle, onDelete, onEdit , showTaskDetail }: Props) {
  // const { taskList, fetchTasks, createTask,updateTask, loading, status, error } =useTask();

const { theme } = useTheme();
const styles = getStyle(theme);

  const RightActions = () => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={onEdit}
        >
          <Ionicons name="create-outline" size={20} color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const badgeStyle = () => {
    if (task.completed) {
      return {
        backgroundColor: "#DFF6DD",
        color: "#2E7D32",
        text: "Completed",
      };
    }

    switch (task.priority) {
      case "High":
        return {
          backgroundColor: "#FDE2E2",
          color: "#E53935",
          text: "High",
        };

      case "Medium":
        return {
          backgroundColor: "#FFF4DB",
          color: "#FB8C00",
          text: "Medium",
        };

      default:
        return {
          backgroundColor: "#E8F5E9",
          color: "#43A047",
          text: "Low",
        };
    }
  };

  const badge = badgeStyle();

  return (
    <ReanimatedSwipeable
      renderRightActions={() => <RightActions />}
      overshootRight={false}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.card}
        onPress={() => showTaskDetail(task)}
      >
        {/* Left */}

        <View style={styles.left}>
          <TouchableOpacity onPress={onToggle}>
            <Ionicons
              name={task.completed ? "checkmark-circle" : "ellipse-outline"}
              size={26}
              color={task.completed ? "#3D8B55" : "#8CBF9A"}
            />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text
              style={[styles.title, task.completed && styles.completedTitle]}
            >
              {task.title}
            </Text>

            <View style={styles.dateRow}>
              
              <Text style={styles.taskMeta}>{task.category} •</Text>
              <Text style={styles.date}>{formatDate(task.dueDate)}</Text>
            </View>
          </View>
        </View>

        {/* Right */}

        <View
          style={[
            styles.badge,
            {
              backgroundColor: badge.backgroundColor,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color: badge.color,
              },
            ]}
          >
            {badge.text}
          </Text>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
}

const getStyle = (theme : any) =>
StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.text,
  },

  completedTitle: {
    textDecorationLine: "line-through",
    color: theme.textSecondary,
  },
  taskMeta: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  date: {
    marginLeft: 5,
    color: theme.textSecondary,
    fontSize: 13,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    minWidth: 90,
    alignItems: "center",
  },

  badgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  rightActions: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginLeft: 8,
  },

  editButton: {
    backgroundColor: theme.primary,
  },

  deleteButton: {
    backgroundColor: theme.danger,
  },
});
