import { Reducer, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { capitalizeStr } from "../../../../shared/utils/helpers";
import { LabelChangeAuthMode } from "../atoms/LabelChangeAuthMode";
import { AUTH_MODE_ENUM, INPUT_VALUES_ENUM } from "../../utils/enums";
import { ActionType, InputType } from "../../utils/types";
import { reducerHandler, registerHandler } from "../../utils/handlers";
import { RegisterFormFields } from "../molecules/RegisterFormFields";
import { CommonFormFields } from "../molecules/CommonFormFields";

export const INITIAL_INPUTS_VALUES: InputType = {
  email: "",
  password: "",
  repeatPassword: "",
  privacyPolicy: false,
};

export const AuthForm = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const [inputValues, dispatch] = useReducer<Reducer<InputType, ActionType>>(
    reducerHandler,
    INITIAL_INPUTS_VALUES
  );

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{capitalizeStr(mode)}</Text>
      <View>
        <CommonFormFields
          emailValue={inputValues.email}
          passwordValue={inputValues.password}
          dispatch={dispatch}
        />
        {mode === AUTH_MODE_ENUM.REGISTER && (
          <RegisterFormFields
            repeatPasswordValue={inputValues.repeatPassword}
            privacyPolicyValue={inputValues.privacyPolicy}
            dispatch={dispatch}
          />
        )}
      </View>
      <VariantButton onPress={() => registerHandler(inputValues)}>
        {capitalizeStr(mode)}
      </VariantButton>
      <LabelChangeAuthMode mode={mode} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
});
