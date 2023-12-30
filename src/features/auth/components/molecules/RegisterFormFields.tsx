import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { setPrivacyPolicy, setRepeatPassword } from "../../slices/authInputValuesSlice";
import { type RootState } from "../../../../store/rootStore";
import { memo } from "react";

export const RegisterFormFields = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPrivacyPolicy = useSelector((state: RootState) => state.authInputValues.privacyPolicy);

  return (
    <>
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.repeatPassword")}
        onChangeText={(text) => dispatch(setRepeatPassword(text))}
      />
      <View style={styles.policy}>
        <Checkbox
          status={isPrivacyPolicy ? "checked" : "unchecked"}
          onPress={() => {
            dispatch(setPrivacyPolicy(!isPrivacyPolicy));
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
