import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { setEmail, setPassword } from "../../slices/authInputValuesSlice";
import { memo } from "react";

export const CommonFormFields = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <OutlinedInput
        label={t("auth.email")}
        keyboardType="email-address"
        placeholder="user@example.com"
        autoCapitalize="none"
        onChangeText={(text) => dispatch(setEmail(text))}
      />
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.password")}
        onChangeText={(text) => dispatch(setPassword(text))}
      />
    </>
  );
});
