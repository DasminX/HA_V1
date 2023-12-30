import { Stack } from "expo-router";
import { withAuth } from "../../src/shared/hoc/withAuth";
import { COLORS } from "../../src/shared/utils/const-colors";

function DasboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.palette.black },
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default withAuth(DasboardLayout);
