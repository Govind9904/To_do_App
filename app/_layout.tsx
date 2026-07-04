import { TaskProvider } from "@/context/TaskContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <TaskProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </TaskProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
