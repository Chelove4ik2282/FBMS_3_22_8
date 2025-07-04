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
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // путь зависит от структуры проекта

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    let valid = true;
    const newErrors = { name: "", surname: "", email: "", password: "", confirmPassword: "" };

    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      valid = false;
    }
    if (surname.trim().length < 2) {
      newErrors.surname = "Surname must be at least 2 characters.";
      valid = false;
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrors((prev) => ({ ...prev, email: "Email already in use." }));
      } else {
        alert("Registration failed: " + error.message);
      }
    }
  };

  const errorStyle = { color: "red", marginTop: 4, fontSize: 12 };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
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
          {/* Name & Surname */}
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-sm text-[#5D6481] mb-1">Name</Text>
              <TextInput
                className="px-4 py-3 border border-[#ddd] rounded-lg bg-[#f9f9f9] text-base"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#aaa"
                autoCorrect={false}
                autoCapitalize="words"
              />
              {errors.name ? <Text style={errorStyle}>{errors.name}</Text> : null}
            </View>

            <View className="flex-1 ml-2">
              <Text className="text-sm text-[#5D6481] mb-1">Surname</Text>
              <TextInput
                className="px-4 py-3 border border-[#ddd] rounded-lg bg-[#f9f9f9] text-base"
                placeholder="Enter your surname"
                value={surname}
                onChangeText={setSurname}
                placeholderTextColor="#aaa"
                autoCorrect={false}
                autoCapitalize="words"
              />
              {errors.surname ? <Text style={errorStyle}>{errors.surname}</Text> : null}
            </View>
          </View>

          {/* Email */}
          <View className="mb-4">
            <Text className="text-sm text-[#5D6481] mb-1">Email</Text>
            <TextInput
              className="w-full px-4 py-3 border border-[#ddd] rounded-lg bg-[#f9f9f9] text-base"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#aaa"
              textContentType="emailAddress"
              autoComplete="email"
            />
            {errors.email ? <Text style={errorStyle}>{errors.email}</Text> : null}
          </View>

          {/* Password */}
          <View className="mb-4">
            <Text className="text-sm text-[#5D6481] mb-1">Password</Text>
            <View className="w-full border border-[#ddd] rounded-lg bg-[#f9f9f9] flex-row items-center px-4">
              <TextInput
                key={showPassword ? "show" : "hide"}
                className="flex-1 py-3 text-base"
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Text className="text-[#0057ff] text-sm">{showPassword ? "🫣" : "👀"}</Text>
              </Pressable>
            </View>
            {errors.password ? <Text style={errorStyle}>{errors.password}</Text> : null}
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-sm text-[#5D6481] mb-1">Confirm Password</Text>
            <View className="w-full border border-[#ddd] rounded-lg bg-[#f9f9f9] flex-row items-center px-4">
              <TextInput
                key={showConfirmPassword ? "show" : "hide"}
                className="flex-1 py-3 text-base"
                placeholder="Repeat password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#aaa"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowConfirmPassword((prev) => !prev)}>
                <Text className="text-[#0057ff] text-sm">{showConfirmPassword ? "🫣" : "👀"}</Text>
              </Pressable>
            </View>
            {errors.confirmPassword ? <Text style={errorStyle}>{errors.confirmPassword}</Text> : null}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className="w-full py-4 bg-[#0057ff] rounded-lg items-center mb-8 shadow-md shadow-blue-500/30"
            onPress={handleRegister}
          >
            <Text className="text-white font-semibold text-base">Register ➜</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
