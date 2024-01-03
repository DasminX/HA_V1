import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { memo } from "react";
import { useAuthFormStore } from "../../slices/authFormInputsStore";

export const RegisterFormFields = memo(() => {
  const { t } = useTranslation();

  const isPrivacyPolicy = useAuthFormStore((state) => state.privacyPolicy);
  const setRepeatPassword = useAuthFormStore((state) => state.setRepeatPassword);
  const setPrivacyPolicy = useAuthFormStore((state) => state.setPrivacyPolicy);

  return (
    <>
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.repeatPassword")}
        onChangeText={(text) => setRepeatPassword(text)}
      />
      <View style={styles.policy}>
        <Checkbox
          status={isPrivacyPolicy ? "checked" : "unchecked"}
          onPress={() => {
            setPrivacyPolicy(!isPrivacyPolicy);
          }}
        />
        <Text>{t("auth.privacyPolicy")}</Text>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  policy: {
    flexDirection: "row",
    alignItems: "center",
  },
});
