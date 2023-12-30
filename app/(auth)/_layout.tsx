import { Stack } from "expo-router";
import { COLORS } from "../../src/shared/utils/const-colors";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: COLORS.palette.black },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
