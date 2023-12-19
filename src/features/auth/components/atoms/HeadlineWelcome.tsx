import { Headline, Text } from "react-native-paper";
import { COLORS } from "../../../../shared/utils/const-colors";

export const HeadlineWelcome = () => {
  return (
    <Headline style={{ textAlign: "center" }}>
      Welcome to{" "}
      <Text style={{ color: COLORS.palette.orange }}>HangAround</Text>!
    </Headline>
  );
};
