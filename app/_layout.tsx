import { TaskProvider } from "@/context/TaskContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TaskProvider>
  );
}
