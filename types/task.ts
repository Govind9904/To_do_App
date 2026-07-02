export type Task = {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  category?: string;
};
