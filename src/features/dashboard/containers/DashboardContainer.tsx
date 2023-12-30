import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export const DashboardContainer = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ backgroundColor: "red" }}>DUPA</Text>
      <Button onPress={() => router.replace("/(auth)/login")}>AAAAAAAAAA</Button>
    </View>
  );
};
