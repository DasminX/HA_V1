import { ReactNode } from "react";
import { Dialog, DialogProps, Portal, Text } from "react-native-paper";
import VariantButton from "../../../../shared/components/button/VariantButton";
import { capitalizeStr } from "../../../../shared/utils/helpers";
import { useTranslation } from "react-i18next";

type AuthDialogType = (
  props: Omit<
    DialogProps & { heading: string; description?: string },
    "children"
  >
) => ReactNode;

export const AuthDialog: AuthDialogType = (props) => {
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Title style={{ textAlign: "center" }}>
          {capitalizeStr(props.heading) + t("auth.isNotValid")}
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{t("auth.enterValid")}</Text>
          {typeof props.description == "string" &&
            props?.description?.trim() !== "" && (
              <Text>{props.description}</Text>
            )}
        </Dialog.Content>
        <Dialog.Actions>
          <VariantButton
            style={{ width: "50%", marginRight: "auto", marginLeft: "auto" }}
            variant="green"
            onPress={props.onDismiss}
          >
            {t("auth.close")}
          </VariantButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
