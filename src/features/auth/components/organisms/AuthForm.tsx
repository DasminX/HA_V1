import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { LabelChangeAuthMode } from "../atoms/LabelChangeAuthMode";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { COLORS } from "../../../../shared/utils/const-colors";
import { ForgotPasswordLink } from "../atoms/ForgotPasswordLink";
import { EmailFormField } from "../molecules/EmailFormField";
import { PasswordFormField } from "../molecules/PasswordFormField";
import { RepeatPasswordFormField } from "../molecules/RepeatPasswordFormField";
import { PrivacyPolicyFormField } from "../molecules/PrivacyPolicyFormField";

type AuthFormProps = {
  mode: AUTH_MODE_ENUM;
  isSubmitting: boolean;
  handleSubmit: () => void;
};

export const AuthForm = memo(({ mode, isSubmitting, handleSubmit }: AuthFormProps) => {
  const { t } = useTranslation();

  const modeLowercaseText = mode.toLowerCase();

  // TODO SNACKBAR
  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.${modeLowercaseText}`)}</Text>
      {mode !== AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD && <EmailFormField />}
      {mode !== AUTH_MODE_ENUM.FORGOT_PASSWORD && <PasswordFormField />}
      {mode !== AUTH_MODE_ENUM.LOGIN && mode !== AUTH_MODE_ENUM.FORGOT_PASSWORD && (
        <RepeatPasswordFormField />
      )}
      {mode === AUTH_MODE_ENUM.REGISTER && <PrivacyPolicyFormField />}
      <VariantButton onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
        {t(`auth.${modeLowercaseText}`)}
      </VariantButton>
      {mode !== AUTH_MODE_ENUM.FORGOT_PASSWORD &&
        mode !== AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD && <LabelChangeAuthMode mode={mode} />}
      {mode === AUTH_MODE_ENUM.LOGIN && <ForgotPasswordLink />}
    </View>
  );
});

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
