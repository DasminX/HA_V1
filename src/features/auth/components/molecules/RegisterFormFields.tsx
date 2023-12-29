import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { INPUT_VALUES_ENUM } from "../../utils/enums";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { setInputValues } from "../../slices/authInputValuesSlice";
import { type RootState } from "../../../../store/rootStore";

export const RegisterFormFields = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPrivacyPolicy = useSelector((state: RootState) => state.authInputValues.privacyPolicy);

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
            }),
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
              }),
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
