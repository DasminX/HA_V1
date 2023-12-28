import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { LabelChangeAuthMode } from "../atoms/LabelChangeAuthMode";
import { AUTH_MODE_ENUM, INPUT_VALUES_ENUM } from "../../utils/enums";
import { CredentialsType, InputType } from "../../utils/types";
import { RegisterFormFields } from "../molecules/RegisterFormFields";
import { CommonFormFields } from "../molecules/CommonFormFields";
import { AuthDialog } from "../atoms/AuthDialog";
import { COLORS } from "../../../../shared/utils/const-colors";
import { useAuthForm } from "../../hooks/useAuthForm";
import { AuthValidatorFactory } from "../../services/validator/ValidationServiceImpl";
import { AuthServiceFactory } from "../../services/api/AuthServiceImpl";
import { useDispatch } from "react-redux";
import { setToken } from "../../slices/authSlice";
import { useRouter } from "expo-router";

export const DEFAULT_INPUTS_VALUES: InputType = Object.freeze({
  email: "",
  password: "",
  repeatPassword: "",
  privacyPolicy: false,
});
export const DEFAULT_CREDENTIALS: CredentialsType = { bool: false, cause: "" };

export const AuthForm = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const {
    inputValues,
    dispatchInputValues,
    isWrongCredentials,
    setIsWrongCredentials,
    isSubmitting,
    setIsSubmitting,
  } = useAuthForm(DEFAULT_INPUTS_VALUES, DEFAULT_CREDENTIALS);

  const handleAuthClick = async () => {
    setIsSubmitting(true);
    const validationResult =
      AuthValidatorFactory.initialize(mode).validateInputs(inputValues);

    if (validationResult.status === "error") {
      setIsWrongCredentials({ bool: true, cause: validationResult.cause });
      return setIsSubmitting(false);
    }

    const response = await AuthServiceFactory.getProperInstance(mode).authorize(
      inputValues.email,
      inputValues.password
    );
    setIsSubmitting(false);

    if (response.status === "error") {
      setIsWrongCredentials({ bool: true, cause: response.cause });
      return;
    }

    switch (response.mode) {
      case AUTH_MODE_ENUM.LOGIN:
        dispatch(
          setToken({ token: response.token, expiresIn: response.expiresIn })
        );
        router.replace("/(dashboard)/dashboard");
        break;
      case AUTH_MODE_ENUM.REGISTER:
        router.replace("/(auth)/login");
        break;
    }
  };

  // TODO SNACKBAR
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
      <VariantButton
        onPress={handleAuthClick}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
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
