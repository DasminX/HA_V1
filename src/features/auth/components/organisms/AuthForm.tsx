import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import VariantButton from "../../../../shared/components/button/VariantButton";
import { capitalizeStr } from "../../../../shared/utils/helpers";
import { LabelChangeAuthMode } from "../atoms/LabelChangeAuthMode";
import { AUTH_MODE_ENUM, INPUT_VALUES_ENUM } from "../../utils/enums";
import { CredentialsType, InputType } from "../../utils/types";
import { authorize } from "../../utils/handlers";
import { RegisterFormFields } from "../molecules/RegisterFormFields";
import { CommonFormFields } from "../molecules/CommonFormFields";
import { AuthDialog } from "../atoms/AuthDialog";
import { COLORS } from "../../../../shared/utils/const-colors";
import { useAuthForm } from "../../hooks/useAuthForm";
import { AuthValidatorFactory } from "../../utils/validators";
import { useTranslation } from "react-i18next";

export const DEFAULT_INPUTS_VALUES: InputType = Object.freeze({
  email: "",
  password: "",
  repeatPassword: "",
  privacyPolicy: false,
});
export const DEFAULT_CREDENTIALS: CredentialsType = { bool: false, cause: "" };

export const AuthForm = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const { t } = useTranslation();
  const {
    inputValues,
    dispatchInputValues,
    isWrongCredentials,
    setIsWrongCredentials,
    isSubmitting,
    setIsSubmitting,
  } = useAuthForm(DEFAULT_INPUTS_VALUES, DEFAULT_CREDENTIALS);

  const handleAuthClick = () => {
    setIsSubmitting(true);
    const validationResult =
      AuthValidatorFactory.initialize(mode).validateInputs(inputValues);

    if (validationResult.status === "error") {
      setIsWrongCredentials({ bool: true, cause: validationResult.cause });
      setIsSubmitting(false);
      return;
    }
    const response = authorize(mode, inputValues);
  };

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.${mode.toLowerCase()}`)}</Text>
      <CommonFormFields dispatch={dispatchInputValues} />
      {mode === AUTH_MODE_ENUM.REGISTER && (
        <RegisterFormFields
          privacyPolicyValue={inputValues.privacyPolicy}
          dispatch={dispatchInputValues}
        />
      )}
      <VariantButton onPress={handleAuthClick} loading={isSubmitting}>
        {t(`auth.${mode.toLowerCase()}`)}
      </VariantButton>
      <LabelChangeAuthMode mode={mode} />
      <AuthDialog
        visible={isWrongCredentials.bool}
        onDismiss={() => setIsWrongCredentials({ bool: false, cause: "" })}
        cause={isWrongCredentials.cause}
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
