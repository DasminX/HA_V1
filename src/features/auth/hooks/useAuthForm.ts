import { Reducer, useReducer, useState } from "react";
import { ActionType, CredentialsType, InputType } from "../utils/types";
import { reducerHandler } from "../utils/handlers";

export const useAuthForm = (
  DEFAULT_INPUTS_VALUES: InputType,
  DEFAULT_CREDENTIALS: CredentialsType
) => {
  const [inputValues, dispatch] = useReducer<Reducer<InputType, ActionType>>(
    reducerHandler,
    DEFAULT_INPUTS_VALUES
  );
  const [isWrongCredentials, setIsWrongCredentials] =
    useState(DEFAULT_CREDENTIALS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return {
    inputValues,
    dispatchInputValues: dispatch,
    isWrongCredentials,
    setIsWrongCredentials,
    isSubmitting,
    setIsSubmitting,
  } as const;
};
