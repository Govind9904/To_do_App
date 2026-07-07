import { useTask } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { darkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const { taskList } = useTask();

  const totalTask = taskList.length;
  const completedTask = taskList.filter((task) => task.completed).length;
  const pendingTask = totalTask - completedTask;

  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    loadNotificationSetting();
  }, []);

  const loadNotificationSetting = async () => {
    try {
      const value = await AsyncStorage.getItem("notificationsEnabled");
      if (value !== null) {
        setNotificationsEnabled(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationToggle = async (value: boolean) => {
    // setNotificationsEnabled(value);

    // if (!value) {
    //   await Notifications.cancelAllScheduledNotificationsAsync();
    //   return;
    // }

    // const { status } = await Notifications.requestPermissionsAsync();

    // if (status !== "granted") {
    //   alert("Notification permission denied");
    //   return;
    // }

    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "Todo Reminder",
    //     body: "Notifications are working 🎉",
    //     sound: true,
    //   },
    //   trigger: {
    //     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //     seconds: 5,
    //     channelId: "default",
    //   },
    // });

    // const scheduled = await Notifications.getAllScheduledNotificationsAsync();

    // console.log("Scheduled Notifications:", JSON.stringify(scheduled, null, 2));

    // console.log("Notification scheduled");
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        alert("Notification permission denied");
        return;
      }
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }

    setNotificationsEnabled(value);

    await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(value));
  };

  const MenuItem = ({
    icon,
    title,
    color = "#3D8B55",
    right,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    color?: string;
    right?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.left}>
        <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>

        <Text style={styles.menuText}>{title}</Text>
      </View>

      {right ?? <Ionicons name="chevron-forward" size={20} color="#999" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Card */}

      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/200?img=12",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Govind Prajapati</Text>

        <Text style={styles.email}>govind@example.com</Text>
      </View>

      {/* Statistics */}

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalTask}</Text>
          <Text style={styles.statTitle}>Tasks</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completedTask}</Text>
          <Text style={styles.statTitle}>Completed</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendingTask}</Text>
          <Text style={styles.statTitle}>Pending</Text>
        </View>
      </View>

      {/* Settings */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <MenuItem
          icon="moon-outline"
          title="Dark Mode"
          right={<Switch value={darkMode} onValueChange={toggleTheme} />}
        />

        <MenuItem
          icon="notifications-outline"
          title="Notifications"
          right={
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
            />
          }
        />
      </View>

      {/* Logout */}

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace("/screens/authScreen/LoginScreen")}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />

        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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

    profileCard: {
      backgroundColor: theme.primary,
      borderRadius: 25,
      alignItems: "center",
      paddingVertical: 30,
      marginTop: 15,
    },

    avatar: {
      width: 95,
      height: 95,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: "#fff",
    },

    name: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "700",
      marginTop: 15,
    },

    email: {
      color: "#EAEAEA",
      marginTop: 5,
    },

    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 22,
      marginBottom: 22,
    },

    statCard: {
      width: "31%",
      backgroundColor: theme.card,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      elevation: 3,
    },

    statValue: {
      fontSize: 26,
      fontWeight: "700",
      color: theme.primary,
    },

    statTitle: {
      color: theme.textSecondary,
      marginTop: 6,
    },

    section: {
      backgroundColor: theme.card,
      borderRadius: 20,
      padding: 15,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 15,
      color: theme.text,
    },

    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
    },

    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },

    menuText: {
      marginLeft: 14,
      fontSize: 16,
      color: "#333",
      fontWeight: "500",
    },

    logout: {
      marginVertical: 25,
      backgroundColor: theme.danger,
      height: 55,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },

    logoutText: {
      color: "#fff",
      fontWeight: "700",
      marginLeft: 10,
      fontSize: 16,
    },
  });
