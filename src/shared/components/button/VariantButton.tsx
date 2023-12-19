import { Button, ButtonProps } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/const-colors";

interface VariantButtonProps extends ButtonProps {
  variant?: keyof typeof COLORS.variants;
}

// TODO textColor do wywalenia?
export default function VariantButton({
  children,
  onPress,
  variant = "blue",
  textColor = "white",
}: VariantButtonProps) {
  return (
    <Button
      onPress={onPress}
      buttonColor={COLORS.variants[variant]}
      textColor={textColor}
      uppercase
      style={styles.button}
    >
      {children}
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
