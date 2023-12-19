import { Dispatch } from "react";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";
import { ActionType, InputType } from "../../utils/types";
import { INPUT_VALUES_ENUM } from "../../utils/enums";

type CommonFormFieldsProps = {
  emailValue: InputType["email"];
  passwordValue: InputType["password"];
  dispatch: Dispatch<ActionType>;
};

export const CommonFormFields = ({
  emailValue,
  passwordValue,
  dispatch,
}: CommonFormFieldsProps) => {
  return (
    <>
      <OutlinedInput
        label={"Email"}
        keyboardType="email-address"
        placeholder="user@example.com"
        autoCapitalize="none"
        value={emailValue}
        onChangeText={(text) =>
          dispatch({ type: INPUT_VALUES_ENUM.EMAIL, payload: text })
        }
      />
      <OutlinedInput
        secureTextEntry={true}
        label={"Password"}
        value={passwordValue}
        onChangeText={(text) =>
          dispatch({ type: INPUT_VALUES_ENUM.PASSWORD, payload: text })
        }
      />
    </>
  );
};
