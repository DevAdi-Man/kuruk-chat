import { Tabs } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RF } from "@/src/utils/dimensions";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View className="flex-row h-16 border-[1px] rounded-2xl justify-around items-center">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const label =
          typeof options.tabBarLabel === "function"
            ? (options.tabBarLabel({
                focused: isFocused,
                color: isFocused ? "#008192" : "#888888",
                position: "below-icon",
                children: route.name,
              }) as string)
            : (options.tabBarLabel ?? options.title ?? route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} className="items-center">
            <Ionicons
              name={
                route.name === "chat" ? "chatbubble-outline" : "person-outline"
              }
              size={24}
              color={isFocused ? "#008192" : "#888888"}
            />
            <Text
              style={{
                fontSize: RF(14),
                color: isFocused ? "#008192" : "#888888",
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
