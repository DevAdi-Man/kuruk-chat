import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Welcome" }} />
            <Stack.Screen name="signUp" options={{ title: "Register" }} />
            <Stack.Screen name="login" options={{ title: "Login" }} />
            <Stack.Screen name="forgotPassword" options={{ title: "Forgot Password" }} />
            <Stack.Screen name='otp' options={{ title: 'Otp' }} />
        </Stack>
    );
}
