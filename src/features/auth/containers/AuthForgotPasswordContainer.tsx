import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import { AuthHeadline } from "../components/atoms/AuthHeadline";
import { AUTH_MODE_ENUM, AUTH_RESPONSE_ENUM, VALIDATION_STATUS_ENUM } from "../utils/enums";
import { AuthServiceFactory } from "../services/api/AuthServiceImpl";
import { AuthDialog } from "../components/atoms/AuthDialog";
import { useAuthFormStore } from "../slices/authFormInputsStore";
import { AuthForgotPasswordForm } from "../components/organisms/AuthForgotPasswordForm";
import { AuthValidatorFactory } from "../services/validator/ValidationServiceImpl";
import { Button } from "react-native-paper";

type FormValidityType = Readonly<{
  isInvalid: boolean;
  cause: string;
}>;

const DEFAULT_IS_FORM_INVALID: FormValidityType = { isInvalid: false, cause: "" };

export const AuthForgotPasswordContainer = ({
  mode,
}: {
  mode: Exclude<AUTH_MODE_ENUM, "LOGIN" | "REGISTER">;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState<FormValidityType>(DEFAULT_IS_FORM_INVALID);

  const email = useAuthFormStore((state) => state.email);
  const password = useAuthFormStore((state) => state.password);
  const repeatPassword = useAuthFormStore((state) => state.repeatPassword);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  useEffect(() => {
    resetInputs();
  }, [mode]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const validationResult = AuthValidatorFactory.initialize(mode)?.validateInputs({
        email: email,
        password: password,
        repeatPassword: repeatPassword,
        privacyPolicy: false,
      });

      if (!validationResult || validationResult?.status === VALIDATION_STATUS_ENUM.ERROR) {
        return setIsFormInvalid({
          isInvalid: true,
          cause: validationResult?.cause ?? "common.unknownError",
        });
      }

      const authService = AuthServiceFactory.getProperInstance(mode);
      if (authService == null) {
        throw "common.internalError";
      }

      const response = await authService.authorize(email, password);
      if (response.status === AUTH_RESPONSE_ENUM.ERROR) {
        return setIsFormInvalid({
          isInvalid: true,
          cause: response.message,
        });
      }

      resetInputs();

      router.replace("/auth/login");
    } catch (e) {
      return setIsFormInvalid({
        isInvalid: true,
        cause: e as string,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, email, password, repeatPassword]);

  // TODO ZROBIC ZAPOMNIALEM HASLO
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Button
        onPress={() => (router.canGoBack() ? router.back() : router.replace("/auth/login"))}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        &lt;=
      </Button>
      <View>
        <AuthHeadline mode={mode} />
        <AuthForgotPasswordForm
          mode={mode}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
        <AuthDialog
          visible={isFormInvalid.isInvalid}
          onDismiss={useCallback(() => setIsFormInvalid(DEFAULT_IS_FORM_INVALID), [])}
          cause={isFormInvalid.cause}
        />
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
