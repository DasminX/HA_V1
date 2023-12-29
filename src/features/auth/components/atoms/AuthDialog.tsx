import { type ReactNode } from "react";
import { Dialog, type DialogProps, Portal, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import VariantButton from "../../../../shared/components/button/VariantButton";
import { camelCaseStr } from "../../../../shared/utils/helpers";

type AuthDialogType = (
  props: Omit<DialogProps & { cause: string /* description?: string  */ }, "children">,
) => ReactNode;

export const AuthDialog: AuthDialogType = (props) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Title style={{ textAlign: "center" }}>
          {t(`auth.${camelCaseStr(props.cause.toLowerCase(), "_")}Invalid`)}
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{t("auth.enterValid")}</Text>
          {/* {typeof props.description == "string" &&
            props.description.trim() !== "" && <Text>{props.description}</Text>} */}
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
