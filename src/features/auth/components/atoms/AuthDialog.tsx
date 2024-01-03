import { memo } from "react";
import { Dialog, type DialogProps, Portal, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import VariantButton from "../../../../shared/components/button/VariantButton";
import { camelCaseStr } from "../../../../shared/utils/string-transformators";

type AuthDialogProps = Omit<
  DialogProps & { cause: string /* description?: string  */ },
  "children"
>;

export const AuthDialog = memo(({ visible, cause, onDismiss }: AuthDialogProps) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={{ textAlign: "center" }}>
          {t(`auth.${camelCaseStr(cause.toLowerCase(), "_")}Invalid`)}
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{t("auth.enterValid")}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <VariantButton
            style={{ width: "50%", marginRight: "auto", marginLeft: "auto" }}
            variant="green"
            onPress={onDismiss}
          >
            {t("auth.close")}
          </VariantButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});
