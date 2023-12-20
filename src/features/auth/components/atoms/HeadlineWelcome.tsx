import { Headline, Text } from "react-native-paper";
import { COLORS } from "../../../../shared/utils/const-colors";
import { useTranslation } from "react-i18next";

export const HeadlineWelcome = () => {
  const { t } = useTranslation();

  return (
    <Headline style={{ textAlign: "center" }}>
      {t("auth.welcomeTo")}
      <Text style={{ color: COLORS.palette.orange }}>HangAround</Text>!
    </Headline>
  );
};
