import {
  addTask,
  deleteTask as deleteTaskApi,
  getTasks,
  searchTasks,
  updateTask as updateTaskApi,
} from "@/api/taskApi";
import { scheduleTaskReminder } from "@/service/notification.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";
import { Task } from "../types/task";

export type TaskPayload = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  dueDate: string;
};

type TaskContentType = {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchTasks: () => Promise<void>;
  createTask: (task: TaskPayload) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  searchTask: (
    search: string,
    filter: "All" | "Pending" | "Completed",
  ) => Promise<void>;
  loading: boolean;
  status: "idle" | "success" | "error";
  error: string | null;
};

const TaskContext = createContext<TaskContentType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setStatus("idle");
      setError(null);

      const response = await getTasks();

      // console.log("Response in Get Task Api", response);

      setTaskList(response);
      setStatus("success");
    } catch (err: any) {
      console.log("Fetch Tasks Error:", err);

      setStatus("error");
      setError(err?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: TaskPayload) => {
    try {
      setLoading(true);
      setError(null);

      await addTask(task);

      const enabled = await AsyncStorage.getItem("notificationsEnabled");
      if (enabled === "true") {
        await scheduleTaskReminder(task);
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      setLoading(true);

      const updatedTask = await updateTaskApi(id, data);

      setTaskList((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task)),
      );
      setLoading(false);
    } catch (err: any) {
      console.log("Update Error Task :-", err);
      setStatus("error");
      setError(err?.message || "Failed to Update Task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await deleteTaskApi(id);
      setStatus("success");
    } catch (err: any) {
      console.log("Delete Task Error:", err);
      setStatus("error");
      setError(err || "Failed to Delete Task");
    } finally {
      setLoading(false);
    }
  };

  const searchTask = async (
    search: string,
    filter: "All" | "Pending" | "Completed",
  ) => {
    try {
      let completed: boolean | undefined;

      if (filter === "Pending") completed = false;
      if (filter === "Completed") completed = true;

      const response = await searchTasks(search, completed);
      // console.log("Full Response", response);
      setTaskList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        searchTask,
        loading,
        status,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used inside TaskProvider");
  }

  return context;
}
