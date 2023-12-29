import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";

import { HeadlineWelcome } from "../components/atoms/HeadlineWelcome";
import { MemoizedAuthForm } from "../components/organisms/AuthForm";
import { AUTH_MODE_ENUM /* INPUT_VALUES_ENUM */ } from "../utils/enums";
import { AuthValidatorFactory } from "../services/validator/ValidationServiceImpl";
import { AuthServiceFactory } from "../services/api/AuthServiceImpl";
import { setToken } from "../slices/authSlice";
import { AuthDialog } from "../components/atoms/AuthDialog";
import { type FormValidityType } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux-hooks";
import { resetInputValues } from "../slices/authInputValuesSlice";
/* import { setInputValues } from "../slices/authInputValuesSlice";
 */
const DEFAULT_IS_FORM_INVALID: FormValidityType = { bool: false, cause: "" };

export const AuthContainer = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState<FormValidityType>(DEFAULT_IS_FORM_INVALID);

  const dispatch = useAppDispatch();
  const inputValues = useAppSelector((state) => state.authInputValues);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const validationResult = AuthValidatorFactory.initialize(mode).validateInputs(inputValues);
      if (validationResult.status === "error") {
        return setIsFormInvalid({
          bool: true,
          cause: validationResult.cause,
        });
      }

      const response = await AuthServiceFactory.getProperInstance(mode).authorize(
        inputValues.email,
        inputValues.password,
      );

      if (response.status === "error") {
        return setIsFormInvalid({
          bool: true,
          cause: response.cause,
        });
      }

      dispatch(resetInputValues());

      switch (response.mode) {
        case AUTH_MODE_ENUM.LOGIN:
          dispatch(setToken({ token: response.token, expiresIn: response.expiresIn }));
          router.replace("/(dashboard)/dashboard");
          break;
        case AUTH_MODE_ENUM.REGISTER:
          router.replace("/(auth)/login");
          break;
      }
    } catch (e) {
    } finally {
      setIsSubmitting(false);
      return;
    }
  }, [mode]);

  return (
    <View style={styles.root}>
      {mode === AUTH_MODE_ENUM.LOGIN && <HeadlineWelcome />}
      <MemoizedAuthForm mode={mode} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
      <AuthDialog
        visible={isFormInvalid.bool}
        onDismiss={() => setIsFormInvalid({ bool: false, cause: "" })}
        cause={isFormInvalid.cause}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    top: "10%",
    height: "60%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
});
