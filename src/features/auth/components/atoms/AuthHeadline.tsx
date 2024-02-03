import { Headline, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../../shared/utils/const-colors";
import { AUTH_MODE_ENUM } from "../../utils/enums";

export const AuthHeadline = ({ mode }: { mode: AUTH_MODE_ENUM }) => {
  const { t } = useTranslation();

  let headlineText = t("auth.loginTo");
  let isAppNameShown = true;

  switch (mode) {
    case AUTH_MODE_ENUM.LOGIN:
      headlineText = t("auth.loginTo");
      isAppNameShown = true;
      break;
    case AUTH_MODE_ENUM.REGISTER:
      headlineText = t("auth.welcomeTo");
      isAppNameShown = true;
      break;
    case AUTH_MODE_ENUM.FORGOT_PASSWORD:
      headlineText = t("auth.remindPassword");
      isAppNameShown = false;
      break;
    case AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD:
      headlineText = t("auth.changeForgottenPassword");
      isAppNameShown = false;
      break;
  }

  return (
    <Headline style={{ textAlign: "center", marginVertical: 24 }}>
      {headlineText}
      {isAppNameShown && (
        <>
          <Text style={{ color: COLORS.palette.orange }}>HangAround</Text>
          <Text>!</Text>
        </>
      )}
    </Headline>
  );
};
