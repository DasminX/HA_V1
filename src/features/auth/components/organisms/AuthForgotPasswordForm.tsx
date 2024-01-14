import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { COLORS } from "../../../../shared/utils/const-colors";
import { ForgotPasswordFields } from "../molecules/ForgotPasswordFields";
import { ChangeForgottenPasswordFields } from "../molecules/ChangeForgottenPasswordFields";

type AuthFormProps = {
  mode: AUTH_MODE_ENUM;
  isSubmitting: boolean;
  handleSubmit: () => void;
};

export const AuthForgotPasswordForm = memo(
  ({ mode, isSubmitting, handleSubmit }: AuthFormProps) => {
    const { t } = useTranslation();

    const modeLowercaseText = mode.toLowerCase();

    const inputFields =
      mode === AUTH_MODE_ENUM.FORGOT_PASSWORD ? (
        <ForgotPasswordFields />
      ) : (
        <ChangeForgottenPasswordFields />
      );

    // TODO SNACKBAR
    return (
      <View style={styles.form}>
        <Text variant="titleLarge">{t(`auth.${modeLowercaseText}`)}</Text>
        {inputFields}
        <VariantButton onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
          {t(`auth.${modeLowercaseText}`)}
        </VariantButton>
      </View>
    );
  },
);

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
