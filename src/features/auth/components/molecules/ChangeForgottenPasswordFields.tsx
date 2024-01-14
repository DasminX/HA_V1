import { useTranslation } from "react-i18next";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { memo } from "react";
import { useAuthFormStore } from "../../slices/authFormInputsStore";

export const ChangeForgottenPasswordFields = memo(() => {
  const { t } = useTranslation();

  const setPassword = useAuthFormStore((state) => state.setPassword);
  const setRepeatPassword = useAuthFormStore((state) => state.setRepeatPassword);

  return (
    <>
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.password")}
        onChangeText={(text) => setPassword(text)}
      />
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.repeatPassword")}
        onChangeText={(text) => setRepeatPassword(text)}
      />
    </>
  );
});
