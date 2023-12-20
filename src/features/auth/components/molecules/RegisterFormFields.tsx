import { StyleSheet, View } from "react-native";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { Checkbox, Text } from "react-native-paper";
import { ActionType, InputType } from "../../utils/types";
import { INPUT_VALUES_ENUM } from "../../utils/enums";
import { Dispatch } from "react";
import { useTranslation } from "react-i18next";

type RegisterFormFieldsProps = {
  privacyPolicyValue: InputType["privacyPolicy"];
  dispatch: Dispatch<ActionType>;
};

export const RegisterFormFields = ({
  privacyPolicyValue,
  dispatch,
}: RegisterFormFieldsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.repeatPassword")}
        onChangeText={(text) =>
          dispatch({ type: INPUT_VALUES_ENUM.REPEAT_PASSWORD, payload: text })
        }
      />
      <View style={styles.policy}>
        <Checkbox
          status={privacyPolicyValue ? "checked" : "unchecked"}
          onPress={() => {
            dispatch({ type: INPUT_VALUES_ENUM.PRIVACY_POLICY });
          }}
        />
        <Text>{t("auth.privacyPolicy")}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  policy: {
    flexDirection: "row",
    alignItems: "center",
  },
});
