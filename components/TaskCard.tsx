import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import type { Task } from "../app/(tabs)/tasks";

type Props = {
  task: Task;
  onToggle: () => void;
};

export default function TaskCard({
  task,
  onToggle,
}: Props) {
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
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onToggle}
    >
      {/* Left */}

      <View style={styles.left}>
        <TouchableOpacity onPress={onToggle}>
          <Ionicons
            name={
              task.completed
                ? "checkmark-circle"
                : "ellipse-outline"
            }
            size={26}
            color={
              task.completed
                ? "#3D8B55"
                : "#8CBF9A"
            }
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              task.completed &&
                styles.completedTitle,
            ]}
          >
            {task.title}
          </Text>

          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color="#999"
            />

            <Text style={styles.date}>
              {task.date}
            </Text>
          </View>
        </View>
      </View>

      {/* Right */}

      <View
        style={[
          styles.badge,
          {
            backgroundColor:
              badge.backgroundColor,
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
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
    color: "#222",
  },

  completedTitle: {
    textDecorationLine: "line-through",
    color: "#888",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  date: {
    marginLeft: 5,
    color: "#888",
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
});