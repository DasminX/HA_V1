import { Stack } from "expo-router";
import { withAuth } from "../../src/shared/hoc/withAuth";

function DasboardLayout() {
  console.log("DASH LAYOUT");
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="dashboard"
    >
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}

export default withAuth(DasboardLayout);
