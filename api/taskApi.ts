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

// Search Task API
export const searchTasks = async (
  search: string = "",
  completed?: boolean,
): Promise<Task[]> => {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.append("search", search);
  }

  if (completed !== undefined) {
    params.append("completed", String(completed));
  }

  const response = await API.get<Task[]>(`/tasks/filter?${params.toString()}`);

  return response.data;
};
