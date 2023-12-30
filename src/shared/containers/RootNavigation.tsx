import { /* Redirect,  */ Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLoadAuth } from "../hooks/useLoadAuth";
/* <Redirect href={"/(dashboard)/dashboard"} /> */
export default function RootNavigation() {
  const [isAsyncStorageLoaded] = useLoadAuth();

  if (!isAsyncStorageLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <Stack initialRouteName="(dashboard)" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(dashboard)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  );
}
