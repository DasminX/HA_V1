import { StyleSheet, View } from "react-native";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { Checkbox, Text } from "react-native-paper";
import { ActionType, InputType } from "../../utils/types";
import { INPUT_VALUES_ENUM } from "../../utils/enums";
import { Dispatch } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setInputValues } from "../../slices/authInputValuesSlice";
import { RootState } from "../../../../store/rootStore";

export const RegisterFormFields = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPrivacyPolicy = useSelector(
    (state: RootState) => state.authContainer.inputsValues.privacyPolicy
  );

  return (
    <>
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.repeatPassword")}
        onChangeText={(text) =>
          dispatch(
            setInputValues({
              type: INPUT_VALUES_ENUM.REPEAT_PASSWORD,
              payload: text,
            })
          )
        }
      />
      <View style={styles.policy}>
        <Checkbox
          status={isPrivacyPolicy ? "checked" : "unchecked"}
          onPress={() => {
            dispatch(
              setInputValues({
                type: INPUT_VALUES_ENUM.REPEAT_PASSWORD,
                payload: !isPrivacyPolicy,
              })
            );
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
