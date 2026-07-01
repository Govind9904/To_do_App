import { Task } from "@/components/TaskModal";
import { createContext, useContext, useState } from "react";

type TaskContentType = {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskContext = createContext<TaskContentType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>([]);

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
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
