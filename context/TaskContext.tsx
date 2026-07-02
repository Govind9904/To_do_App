import { addTask, getTasks } from "@/api/taskApi";
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

      const response = await addTask(task);
      const newTask = response.data;

      // ⚡ instant UI update (no extra fetch needed)
      setTaskList((prev) => [newTask, ...prev]);

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        fetchTasks,
        createTask,
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
