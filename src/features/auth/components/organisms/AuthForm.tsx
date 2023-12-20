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
import { AuthDialog } from "../atoms/AuthDialog";
import { COLORS } from "../../../../shared/utils/const-colors";

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
  const [wrongCredentials, setWrongCredentials] = useState({
    bool: false,
    cause: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterClick = () => {
    setIsSubmitting(true);
    const response = registerHandler(inputValues);
    if (response.status === "error") {
      setWrongCredentials({ bool: true, cause: response.cause });
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{capitalizeStr(mode)}</Text>
      <CommonFormFields dispatch={dispatch} />
      {mode === AUTH_MODE_ENUM.REGISTER && (
        <RegisterFormFields
          privacyPolicyValue={inputValues.privacyPolicy}
          dispatch={dispatch}
        />
      )}
      <VariantButton onPress={handleRegisterClick} loading={isSubmitting}>
        {capitalizeStr(mode)}
      </VariantButton>
      <LabelChangeAuthMode mode={mode} />
      <AuthDialog
        visible={wrongCredentials.bool}
        onDismiss={() => setWrongCredentials({ bool: false, cause: "" })}
        heading={wrongCredentials.cause}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.palette.orange + "dd",
  },
});
