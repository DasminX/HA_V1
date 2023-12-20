import { ReactNode } from "react";
import { Dialog, DialogProps, Portal, Text } from "react-native-paper";
import VariantButton from "../../../../shared/components/button/VariantButton";
import { capitalizeStr } from "../../../../shared/utils/helpers";

type AuthDialogType = (
  props: Omit<
    DialogProps & { heading: string; description?: string },
    "children"
  >
) => ReactNode;

export const AuthDialog: AuthDialogType = (props) => {
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Title style={{ textAlign: "center" }}>
          {capitalizeStr(props.heading) + " jest niepoprawny!"}
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Proszę wprowadzić poprawną wartość. {props.description ?? ""}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <VariantButton
            style={{ width: "50%", marginRight: "auto", marginLeft: "auto" }}
            variant="green"
            onPress={props.onDismiss}
          >
            Zamknij
          </VariantButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
