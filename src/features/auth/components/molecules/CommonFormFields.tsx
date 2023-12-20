import { Dispatch } from "react";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { ActionType, InputType } from "../../utils/types";
import { INPUT_VALUES_ENUM } from "../../utils/enums";
import { useTranslation } from "react-i18next";

type CommonFormFieldsProps = {
  dispatch: Dispatch<ActionType>;
};

export const CommonFormFields = ({ dispatch }: CommonFormFieldsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <OutlinedInput
        label={t("auth.email")}
        keyboardType="email-address"
        placeholder="user@example.com"
        autoCapitalize="none"
        onChangeText={(text) =>
          dispatch({ type: INPUT_VALUES_ENUM.EMAIL, payload: text })
        }
      />
      <OutlinedInput
        secureTextEntry={true}
        label={t("auth.password")}
        onChangeText={(text) =>
          dispatch({ type: INPUT_VALUES_ENUM.PASSWORD, payload: text })
        }
      />
    </>
  );
};
