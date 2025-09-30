import { Slot, Stack, useRouter } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, useColorScheme } from "react-native";
import { useUserStore } from "../store/user";
import { useEffect } from "react";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const user = useUserStore((state) => state.user);
  // const router = useRouter();

  // useEffect(() => {
  //   if (user === undefined) return;

  //   // Delay navigation until after initial render
  //   const timeout = setTimeout(() => {
  //     if (user) {
  //       router.replace("/(main)/chat"); // exact path
  //     } else {
  //       router.replace("/(auth)"); // exact path
  //     }
  //   }, 0);

  //   return () => clearTimeout(timeout);
  // }, [router, user]);
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme !== "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
      />
      <Stack screenOptions={{ headerShown: false }} />
      {/* <Slot /> */}
    </SafeAreaProvider>
  );
}
