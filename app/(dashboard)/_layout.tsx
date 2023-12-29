import { Stack } from "expo-router";
import { withAuth } from "../../src/shared/hoc/withAuth";

function DasboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="dashboard"
    >
      <Stack.Screen name="dashboard" />
      {/* <Stack.Screen name="settings" /> */}
      {/* <Stack.Screen name="new" /> */}
    </Stack>
  );
}

export default withAuth(DasboardLayout);
