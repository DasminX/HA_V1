import { useTranslation } from "react-i18next";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { memo } from "react";
import { useAuthFormStore } from "../../slices/authFormInputsStore";

export const CommonFormFields = memo(() => {
  const { t } = useTranslation();

  const setEmail = useAuthFormStore((state) => state.setEmail);
  const setPassword = useAuthFormStore((state) => state.setPassword);

  return (
    <>
      <OutlinedInput
        label={t("auth.email")}
        keyboardType="email-address"
        placeholder="user@example.com"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.password")}
        onChangeText={(text) => setPassword(text)}
      />
    </>
  );
});
