import { StyleSheet, View } from "react-native";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { Checkbox, Text } from "react-native-paper";
import { ActionType, InputType } from "../../utils/types";
import { INPUT_VALUES_ENUM } from "../../utils/enums";
import { Dispatch } from "react";

type RegisterFormFieldsProps = {
  repeatPasswordValue: InputType["repeatPassword"];
  privacyPolicyValue: InputType["privacyPolicy"];
  dispatch: Dispatch<ActionType>;
};

export const RegisterFormFields = ({
  repeatPasswordValue,
  privacyPolicyValue,
  dispatch,
}: RegisterFormFieldsProps) => {
  return (
    <>
      <OutlinedInput
        secureTextEntry={true}
        label={"Repeat password"}
        value={repeatPasswordValue}
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
        <Text>Akceptuje politykę prywatności</Text>
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
