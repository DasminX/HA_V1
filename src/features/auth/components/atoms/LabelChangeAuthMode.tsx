import { Link } from "expo-router";
import { Text } from "react-native-paper";
import { capitalizeStr } from "../../../../shared/utils/helpers";
import { COLORS } from "../../../../shared/utils/const-colors";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { AuthPathType } from "../../utils/types";

const LABEL_TEXT = {
  register: "Haven't got an account yet?",
  login: "Do you already have an account?",
};

export const LabelChangeAuthMode = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const oppositePath = (
    mode === AUTH_MODE_ENUM.REGISTER
      ? AUTH_MODE_ENUM.LOGIN.toLowerCase()
      : AUTH_MODE_ENUM.REGISTER.toLowerCase()
  ) as AuthPathType;

  return (
    <Text variant="labelLarge">
      {LABEL_TEXT[oppositePath]}{" "}
      <Text variant="bodyLarge">
        <Link
          style={{ color: COLORS.variants.blue }}
          href={`/(auth)/${oppositePath}`}
        >
          {capitalizeStr(oppositePath)}
        </Link>
      </Text>
    </Text>
  );
};
