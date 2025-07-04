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
} from "react-native";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSendPassword = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // Переход на otp, передаем email как параметр
    router.push({
      pathname: "/otp",
      params: { email },
    });
  };

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
          <Text className="text-lg font-semibold mb-4">Forgot Password</Text>

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
          {error ? (
            <Text style={{ color: "red", marginTop: 4, fontSize: 12 }}>{error}</Text>
          ) : null}

          <TouchableOpacity
            className="w-full py-4 bg-[#0057ff] rounded-xl items-center mt-6"
            onPress={handleSendPassword}
          >
            <Text className="text-white font-semibold text-base">Send Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
