import { Link } from "expo-router";
import { Text } from "react-native-paper";
import { capitalizeStr } from "../../../../shared/utils/helpers";
import { COLORS } from "../../../../shared/utils/const-colors";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { AuthPathType } from "../../utils/types";
import { useTranslation } from "react-i18next";

export const LabelChangeAuthMode = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const { t } = useTranslation();
  const oppositePath = (
    mode === AUTH_MODE_ENUM.REGISTER
      ? AUTH_MODE_ENUM.LOGIN.toLowerCase()
      : AUTH_MODE_ENUM.REGISTER.toLowerCase()
  ) as AuthPathType;

  const translatedText =
    oppositePath === "login" ? "havingAccount" : "notHavingAccount";

  return (
    <Text variant="labelLarge">
      {t(`auth.${translatedText}`)}{" "}
      <Text variant="bodyLarge">
        <Link
          style={{ color: COLORS.variants.blue }}
          href={`/(auth)/${oppositePath}`}
        >
          {capitalizeStr(t(`auth.${oppositePath}`))}
        </Link>
      </Text>
    </Text>
  );
};
