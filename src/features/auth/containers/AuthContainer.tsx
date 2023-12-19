import { View, StyleSheet } from "react-native";

import { HeadlineWelcome } from "../components/atoms/HeadlineWelcome";
import { AuthForm } from "../components/organisms/AuthForm";
import { AUTH_MODE_ENUM } from "../utils/enums";

export const AuthContainer = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  return (
    <View style={styles.root}>
      {mode === AUTH_MODE_ENUM.LOGIN && <HeadlineWelcome />}
      <AuthForm mode={mode} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    top: "10%",
    height: "60%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
});
