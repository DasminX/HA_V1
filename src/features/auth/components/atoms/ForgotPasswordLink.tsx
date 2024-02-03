import { Link } from "expo-router";
import { Text } from "react-native-paper";
import { COLORS } from "../../../../shared/utils/const-colors";
import { useTranslation } from "react-i18next";

export const ForgotPasswordLink = () => {
  const { t } = useTranslation();
  return (
    <Text variant="labelLarge">
      {t("auth.forgotPassword")}{" "}
      <Text variant="bodyLarge">
        <Link
          replace={false}
          style={{ color: COLORS.variants.blue }}
          href={"/auth/forgot-password"}
        >
          {t(`common.clickHere`)}
        </Link>
      </Text>
    </Text>
  );
};
