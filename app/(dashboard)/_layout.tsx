import { Stack } from "expo-router";
import { COLORS } from "../../src/shared/utils/const-colors";
import { withAuth } from "../../src/shared/hoc/withAuth";

function DasboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.palette.black },
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
