import { TaskProvider } from "@/context/TaskContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </TaskProvider>
    </GestureHandlerRootView>
  );
}
