import { loginUser } from "@/api/authApi";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { theme } = useTheme();
  const styles = getStyle(theme);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Validation", "Please enter email.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Validation", "Please enter password.");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password,
      });

      await AsyncStorage.setItem("token", res.token);
      await AsyncStorage.setItem("userName", res.name);

      router.replace("/(tabs)/home");
    } catch (err: any) {
      Alert.alert("Login Failed", err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons name="checkmark-done" size={50} color="#fff" />
        </View>

        <Text style={styles.title}>Welcome Back 👋</Text>

        <Text style={styles.subtitle}>
          Login to continue managing your tasks
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>

        <TextInput
          placeholder="Enter email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor={theme.text}
        />

        <Text style={styles.label}>Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            placeholderTextColor={theme.text}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/screens/authScreen/RegisterScree")}
      >
        <Text style={styles.bottomText}>
          Don't have an account? <Text style={styles.signup}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyle = (theme : any) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#3D8B55",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: theme.secondary,
  },

  subtitle: {
    color: theme.textSecondary,
    marginTop: 8,
    fontSize: 15,
  },

  card: {
    backgroundColor: theme.card,
    borderRadius: 20,
    padding: 22,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 6,
  },

  label: {
    color: theme.text,
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor:theme.input,
    color:theme.text
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 8,
  },

  passwordInput: {
    flex: 1,
    height: 55,
    color:theme.text
  },

  forgot: {
    alignSelf: "flex-end",
    color: "#3D8B55",
    marginBottom: 25,
    fontWeight: "600",
  },

  loginBtn: {
    height: 56,
    backgroundColor: "#3D8B55",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  bottomText: {
    marginTop: 30,
    textAlign: "center",
    color: "#666",
  },

  signup: {
    color: "#3D8B55",
    fontWeight: "700",
  },
});
