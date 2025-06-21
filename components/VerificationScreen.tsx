import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function VerificationScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      if (text && index < code.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSend = () => {
    const finalCode = code.join('');
    console.log('code:', finalCode);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}  
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-between pt-24 px-6 pb-6"> 
          <View>
            <View className="items-center mb-6">
              <Image
                source={require('../assets/icon.png')}
                style={{ width: 90, height: 90 }}
              />
            </View>

            <Text className="text-center text-xl font-semibold text-[#19213D] mb-2">
              Enter verification code
            </Text>
            <Text className="text-center text-sm text-[#5D6481] mb-6">
              We’ve sent a code to{' '}
              <Text className="text-[#0057ff] font-medium">Lois@gmail.com</Text>
            </Text>

            <View className="flex-row justify-between mb-6">
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  className="w-20 h-20 rounded-lg border border-[#ddd] text-xl font-semibold text-center bg-[#f9f9f9]"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  ref={(ref) => (inputs.current[index] = ref)}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === 'Backspace' &&
                      code[index] === '' &&
                      index > 0
                    ) {
                      const newCode = [...code];
                      newCode[index - 1] = '';
                      setCode(newCode);
                      inputs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </View>
          </View>
 
          <View>
            <Text className="text-center text-[#333] mb-6">
              Didn’t get a code?{' '}
              <Text
                className="text-[#0057ff] font-medium"
                onPress={() => console.log('smth to do')}
              >
                Click to resend.
              </Text>
            </Text>

            <View className="flex-row justify-between mb-14">
              <TouchableOpacity
                onPress={handleBack}
                className="flex-1 mr-2 py-4 bg-white border border-gray-300 rounded-lg items-center"
              >
                <Text className="text-[#333] font-medium">Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSend}
                className="flex-1 ml-2 py-4 bg-[#0057ff] rounded-lg items-center"
              >
                <Text className="text-white font-semibold">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
