import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import VariantButton from "../../src/shared/components/button/VariantButton";

// TODO REFACTOR

export default function DashboardIndex() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Hello from DASHBOARD</Text>
      <VariantButton
        onPress={() => {
          router.replace("/(auth)/login");
        }}
      >
        Go back to login
      </VariantButton>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
