import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // путь может отличаться

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/otp"); // или "/home" если у тебя нет OTP
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setErrors((prev) => ({ ...prev, email: "No user found with this email." }));
      } else if (error.code === "auth/wrong-password") {
        setErrors((prev) => ({ ...prev, password: "Incorrect password." }));
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };

  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };

  const errorStyle = { color: "red", marginTop: 4, fontSize: 12 };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 40,
            paddingTop: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Email */}
          <Text className="text-sm text-[#5D6481] mb-1">Email</Text>
          <TextInput
            className="w-full mb-1 px-4 py-3 border border-[#ddd] rounded-xl bg-[#f9f9f9] text-base"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#aaa"
          />
          {errors.email ? <Text style={errorStyle}>{errors.email}</Text> : null}

          {/* Password */}
          <View className="mb-4">
            <Text className="text-sm text-[#5D6481] mb-1">Password</Text>
            <View className="w-full border border-[#ddd] rounded-lg bg-[#f9f9f9] flex-row items-center px-4">
              <TextInput
                className="flex-1 py-3 text-base"
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Text className="text-[#0057ff] text-sm">
                  {showPassword ? "🫣" : "👀"}
                </Text>
              </Pressable>
            </View>
            {errors.password ? <Text style={errorStyle}>{errors.password}</Text> : null}
          </View>

          {/* Remember Me + Forgot */}
          <View className="flex-row justify-between items-center mb-6">
            <Pressable onPress={toggleRememberMe} className="flex-row items-center">
              <View
                className={`w-5 h-5 mr-2 border border-gray-400 rounded-md items-center justify-center ${
                  rememberMe ? "bg-[#0057ff]" : "bg-white"
                }`}
              >
                {rememberMe && <Text className="text-white text-sm text-center">✓</Text>}
              </View>
              <Text className="text-[#5D6481]">Remember me</Text>
            </Pressable>

            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text className="text-[#0057ff] font-medium">Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className="w-full py-4 bg-[#0057ff] rounded-xl items-center mb-6 shadow-md shadow-blue-500/30"
            onPress={handleLogin}
          >
            <Text className="text-white font-semibold text-base">Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-3 text-[#5D6481] text-sm">or login with</Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          {/* Social Icons */}
          <View className="flex-row justify-center space-x-6">
            <TouchableOpacity style={{ marginRight: "15%" }} onPress={() => alert("Google login")}>
              <Image
                source={require("../../../assets/Google_logo.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: "15%", marginLeft: "15%" }} onPress={() => alert("Apple login")}>
              <Image
                source={require("../../../assets/Apple_logo.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: "15%" }} onPress={() => alert("X login")}>
              <Image
                source={require("../../../assets/X_logo.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
