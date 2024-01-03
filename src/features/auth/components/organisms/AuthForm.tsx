import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { LabelChangeAuthMode } from "../atoms/LabelChangeAuthMode";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { RegisterFormFields } from "../molecules/RegisterFormFields";
import { CommonFormFields } from "../molecules/CommonFormFields";
import { COLORS } from "../../../../shared/utils/const-colors";

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
      <CommonFormFields />
      {mode === AUTH_MODE_ENUM.REGISTER && <RegisterFormFields />}
      <VariantButton onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
        {t(`auth.${modeLowercaseText}`)}
      </VariantButton>
      <LabelChangeAuthMode mode={mode} />
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
