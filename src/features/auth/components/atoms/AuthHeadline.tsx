import { Headline, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../../shared/utils/const-colors";
import { AUTH_MODE_ENUM } from "../../utils/enums";

export const AuthHeadline = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const { t } = useTranslation();

  const headlineText = mode === AUTH_MODE_ENUM.LOGIN ? t("auth.loginTo") : t("auth.welcomeTo");

  return (
    <Headline style={{ textAlign: "center", marginVertical: 24 }}>
      {headlineText}
      <Text style={{ color: COLORS.palette.orange }}>HangAround</Text>!
    </Headline>
  );
};
