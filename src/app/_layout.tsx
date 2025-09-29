import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, useColorScheme } from "react-native";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={colorScheme !== "dark" ? "light-content" : "dark-content"} backgroundColor="transparent" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
