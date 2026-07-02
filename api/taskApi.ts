import { Task } from "@/types/task";
import API from "./axios";

export const getTasks = async (): Promise<Task[]> => {
  const response = await API.get<Task[]>("/tasks");
  return response.data;
};

export const addTask = async (task: Partial<Task>) => {
  const response = await API.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const response = await API.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};
