import { Stack } from "expo-router";
import { COLORS } from "../../src/shared/utils/const-colors";

export default function AuthLayout() {
  console.log("AUTH LAYOUT");
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.palette.black },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
