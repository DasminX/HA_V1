import { Stack } from "expo-router";
import { useLoadAuth } from "../hooks/useLoadAuth";

export default function RootNavigation() {
  const [isAsyncStorageLoaded] = useLoadAuth();
  if (!isAsyncStorageLoaded) return null;

  return (
    <Stack initialRouteName="(dashboard)" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="(dashboard)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
