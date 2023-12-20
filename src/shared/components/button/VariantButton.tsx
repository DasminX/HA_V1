import { Button, ButtonProps } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/const-colors";

interface VariantButtonProps extends ButtonProps {
  variant?: keyof typeof COLORS.variants;
}

// TODO textColor do wywalenia?
export default function VariantButton(props: VariantButtonProps) {
  return (
    <Button
      buttonColor={COLORS.variants[props.variant ?? "blue"]}
      uppercase
      style={styles.button}
      {...props}
    >
      {props.children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    minWidth: "30%",
    maxWidth: "80%",
    marginVertical: 12,
    marginHorizontal: 8,
  },
});
