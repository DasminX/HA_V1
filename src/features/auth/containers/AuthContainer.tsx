import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import { AuthHeadline } from "../components/atoms/AuthHeadline";
import { AuthForm } from "../components/organisms/AuthForm";
import { AUTH_MODE_ENUM, AUTH_RESPONSE_ENUM, VALIDATION_STATUS_ENUM } from "../utils/enums";
import { AuthValidatorFactory } from "../services/validator/ValidationServiceImpl";
import { AuthServiceFactory } from "../services/api/AuthServiceImpl";
import { AuthDialog } from "../components/atoms/AuthDialog";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthFormStore } from "../slices/authFormInputsStore";
import { useAuthStore } from "../../../shared/slices/authStore";

type FormValidityType = Readonly<{
  isInvalid: boolean;
  cause: string;
}>;

const DEFAULT_IS_FORM_INVALID: FormValidityType = { isInvalid: false, cause: "" };

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
      const validationResult = AuthValidatorFactory.initialize(mode)?.validateInputs({
        email,
        password,
        repeatPassword,
        privacyPolicy,
      });

      if (!validationResult || validationResult.status === VALIDATION_STATUS_ENUM.ERROR) {
        console.log(validationResult);
        return setIsFormInvalid({
          isInvalid: true,
          cause: validationResult?.cause ?? "common.unknownError",
        });
      }

      const authService = AuthServiceFactory.getProperInstance(mode);
      if (authService == null) {
        throw "errors.internalError";
      }

      const response = await authService.authorize(email, password);
      if (response.status === AUTH_RESPONSE_ENUM.ERROR) {
        return setIsFormInvalid({
          isInvalid: true,
          cause: response.message,
        });
      }

      resetInputs();

      switch (response.mode) {
        case AUTH_MODE_ENUM.LOGIN:
          if (
            "token" in response &&
            typeof response.token === "string" &&
            "expiresIn" in response &&
            typeof response.expiresIn === "number"
          ) {
            setToken({ token: response.token, expiresIn: response.expiresIn });
          }
          router.replace("/dashboard/");
          break;
        case AUTH_MODE_ENUM.REGISTER:
        case AUTH_MODE_ENUM.FORGOT_PASSWORD:
        case AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD:
          router.replace("/auth/login");
          break;
      }
    } catch (e) {
      return setIsFormInvalid({
        isInvalid: true,
        cause: e as string,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, email, password, repeatPassword, privacyPolicy]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <AuthHeadline mode={mode} />
        <AuthForm mode={mode} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
        <AuthDialog
          visible={isFormInvalid.isInvalid}
          onDismiss={useCallback(() => setIsFormInvalid(DEFAULT_IS_FORM_INVALID), [])}
          cause={isFormInvalid.cause}
        />
        <Button
          onPress={async () => {
            router.replace("/dashboard/");
          }}
        >
          TEST idz do dashboard
        </Button>
        <Button
          onPress={async () => {
            router.replace("/auth/change-forgotten-password");
          }}
        >
          TEST idz do change forgotten password
        </Button>
        <Button
          onPress={async () => {
            resetToken();
            await AsyncStorage.clear();
          }}
        >
          TEST reset token
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
