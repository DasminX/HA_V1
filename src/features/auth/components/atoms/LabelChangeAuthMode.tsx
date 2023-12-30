import { Link } from "expo-router";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { capitalizeStr } from "../../../../shared/utils/helpers";
import { COLORS } from "../../../../shared/utils/const-colors";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { type AuthPathType } from "../../utils/types";

export const LabelChangeAuthMode = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const { t } = useTranslation();

  const oppositePath = (
    mode === AUTH_MODE_ENUM.REGISTER
      ? AUTH_MODE_ENUM.LOGIN.toLowerCase()
      : AUTH_MODE_ENUM.REGISTER.toLowerCase()
  ) as AuthPathType;

  const oppositePathLinkText =
    oppositePath === "login" ? t(`auth.havingAccount`) : t(`auth.notHavingAccount`);

  return (
    <Text variant="labelLarge">
      {oppositePathLinkText}{" "}
      <Text variant="bodyLarge">
        <Link style={{ color: COLORS.variants.blue }} replace href={`/auth/${oppositePath}`}>
          {capitalizeStr(t(`auth.${oppositePath}`))}
        </Link>
      </Text>
    </Text>
  );
};
