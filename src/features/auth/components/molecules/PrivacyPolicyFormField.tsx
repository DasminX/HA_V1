import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useAuthFormStore } from "../../slices/authFormInputsStore";

export const PrivacyPolicyFormField = memo(() => {
  const { t } = useTranslation();

  const isPrivacyPolicy = useAuthFormStore((state) => state.privacyPolicy);
  const setPrivacyPolicy = useAuthFormStore((state) => state.setPrivacyPolicy);

  return (
    <View style={styles.policy}>
      <Checkbox
        status={isPrivacyPolicy ? "checked" : "unchecked"}
        onPress={() => {
          setPrivacyPolicy(!isPrivacyPolicy);
        }}
      />
      <Text>{t("auth.privacyPolicy")}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  policy: {
    flexDirection: "row",
    alignItems: "center",
  },
});
