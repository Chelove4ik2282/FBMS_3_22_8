import { Slot, usePathname } from "expo-router";
import AuthTabs from "../../components/auth-tabs";
import { View } from "react-native";

export default function AuthLayout() {
  const pathname = usePathname();

  // Показываем AuthTabs, если не на /otp
  const showTabs = pathname !== "/otp";

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {showTabs && <AuthTabs />}
      <Slot />
    </View>
  );
}
