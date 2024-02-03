import { memo } from "react";
import { Dialog, type DialogProps, Portal, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import VariantButton from "../../../../shared/components/button/VariantButton";
import { StyleSheet } from "react-native";

type AuthDialogProps = Omit<
  DialogProps & { cause: string /* description?: string  */ },
  "children"
>;

// todo obsluga dialog title
export const AuthDialog = memo(({ visible, cause, onDismiss }: AuthDialogProps) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.center}>{t(cause)}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{t("auth.enterValid")}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <VariantButton style={styles.button} variant="green" onPress={onDismiss}>
            {t("common.close")}
          </VariantButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

const styles = StyleSheet.create({
  center: {
    textAlign: "center",
  },
  button: { width: "50%", marginRight: "auto", marginLeft: "auto" },
});
