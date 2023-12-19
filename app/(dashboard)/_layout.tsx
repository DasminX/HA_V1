import { Tabs } from "expo-router";

export default function DasboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
