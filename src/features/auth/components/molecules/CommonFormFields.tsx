import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { INPUT_VALUES_ENUM } from "../../utils/enums";
import { setInputValues } from "../../slices/authInputValuesSlice";

export const CommonFormFields = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <OutlinedInput
        label={t("auth.email")}
        keyboardType="email-address"
        placeholder="user@example.com"
        autoCapitalize="none"
        onChangeText={(text) =>
          dispatch(setInputValues({ type: INPUT_VALUES_ENUM.EMAIL, payload: text }))
        }
      />
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.password")}
        onChangeText={(text) =>
          dispatch(setInputValues({ type: INPUT_VALUES_ENUM.PASSWORD, payload: text }))
        }
      />
    </>
  );
};
