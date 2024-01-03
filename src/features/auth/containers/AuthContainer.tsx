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

  const email = useAuthFormStore((state) => state.email);
  const password = useAuthFormStore((state) => state.password);
  const repeatPassword = useAuthFormStore((state) => state.repeatPassword);
  const privacyPolicy = useAuthFormStore((state) => state.privacyPolicy);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  const setToken = useAuthStore((state) => state.setTokenCredentials);
  const resetToken = useAuthStore((state) => state.resetTokenCredentials);

  useEffect(() => {
    resetInputs();
  }, [mode]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const validationResult = AuthValidatorFactory.initialize(mode).validateInputs({
        email,
        password,
        repeatPassword,
        privacyPolicy,
      });

      if (validationResult.status === VALIDATION_STATUS_ENUM.ERROR) {
        return setIsFormInvalid({
          bool: true,
          cause: validationResult.cause,
        });
      }

      const response = await AuthServiceFactory.getProperInstance(mode).authorize(email, password);

      if (response.status === AUTH_RESPONSE_ENUM.ERROR) {
        return setIsFormInvalid({
          bool: true,
          cause: response.cause,
        });
      }

      resetInputs();

      switch (response.mode) {
        case AUTH_MODE_ENUM.LOGIN:
          setToken({ token: response.token, expiresIn: response.expiresIn });
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
  }, [mode, email, password, repeatPassword, privacyPolicy]);

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
            resetToken();
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
