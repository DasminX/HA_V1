import { Stack } from "expo-router";
import { withAuth } from "../../src/shared/hoc/withAuth";

function DasboardLayout() {
  console.log("DASH LAYOUT");
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default withAuth(DasboardLayout);
