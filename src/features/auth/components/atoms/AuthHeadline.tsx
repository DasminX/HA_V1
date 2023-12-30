import { Headline, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../../shared/utils/const-colors";
import { AUTH_MODE_ENUM } from "../../utils/enums";

export const AuthHeadline = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const { t } = useTranslation();

  const headlineText = mode === "LOGIN" ? t("auth.loginTo") : t("auth.welcomeTo");

  return (
    <Headline style={{ textAlign: "center" }}>
      {headlineText}
      <Text style={{ color: COLORS.palette.orange }}>HangAround</Text>!
    </Headline>
  );
};
