import { StyleSheet, Text, View } from "react-native";

export default function Tasks() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
