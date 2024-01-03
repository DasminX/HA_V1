import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import { AuthHeadline } from "../components/atoms/AuthHeadline";
import { AuthForm } from "../components/organisms/AuthForm";
import {
  AUTH_MODE_ENUM,
  AUTH_RESPONSE_ENUM /* INPUT_VALUES_ENUM */,
  VALIDATION_STATUS_ENUM,
} from "../utils/enums";
import { AuthValidatorFactory } from "../services/validator/ValidationServiceImpl";
import { AuthServiceFactory } from "../services/api/AuthServiceImpl";
import { AuthDialog } from "../components/atoms/AuthDialog";
import { type FormValidityType } from "../utils/types";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthFormStore } from "../slices/authFormInputsStore";
import { useAuthStore } from "../../../shared/slices/authStore";

const DEFAULT_IS_FORM_INVALID: FormValidityType = { bool: false, cause: "" };

export const AuthContainer = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState<FormValidityType>(DEFAULT_IS_FORM_INVALID);

  const { resetInputs, ...inputValues } = useAuthFormStore((state) => ({
    resetInputs: state.resetInputValues,
    email: state.email,
    password: state.password,
    repeatPassword: state.repeatPassword,
    privacyPolicy: state.privacyPolicy,
  }));

  const authStore = useAuthStore((state) => ({
    setToken: state.setTokenCredentials,
    resetToken: state.resetTokenCredentials,
  }));

  useEffect(() => {
    resetInputs();
  }, [mode]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const validationResult = AuthValidatorFactory.initialize(mode).validateInputs(inputValues);
      console.log(validationResult, inputValues);
      if (validationResult.status === VALIDATION_STATUS_ENUM.ERROR) {
        return setIsFormInvalid({
          bool: true,
          cause: validationResult.cause,
        });
      }

      const response = await AuthServiceFactory.getProperInstance(mode).authorize(
        inputValues.email,
        inputValues.password,
      );

      if (response.status === AUTH_RESPONSE_ENUM.ERROR) {
        return setIsFormInvalid({
          bool: true,
          cause: response.cause,
        });
      }

      resetInputs();

      switch (response.mode) {
        case AUTH_MODE_ENUM.LOGIN:
          authStore.setToken({ token: response.token, expiresIn: response.expiresIn });
          router.replace("/dashboard/");
          break;
        case AUTH_MODE_ENUM.REGISTER:
          router.replace("/auth/login");
          break;
      }
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, inputValues]);

  // TODO ZROBIC ZAPOMNIALEM HASLO
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <AuthHeadline mode={mode} />
        <AuthForm mode={mode} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
        <AuthDialog
          visible={isFormInvalid.bool}
          onDismiss={useCallback(
            () => setIsFormInvalid({ bool: false, cause: "" }),
            [isFormInvalid],
          )}
          cause={isFormInvalid.cause}
        />
        <Button
          onPress={async () => {
            authStore.resetToken();
            await AsyncStorage.clear();
          }}
        >
          RESET TOKENS TEST
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    top: "10%",
    height: "65%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
});
