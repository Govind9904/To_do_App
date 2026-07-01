import API from "./axios";

export const getTasks = () => API.get("/tasks");

export const addTask = (title: string) => API.post("/tasks", { title });

export const updateTask = (id: string, data: any) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id: string) => API.delete(`/tasks/${id}`);
