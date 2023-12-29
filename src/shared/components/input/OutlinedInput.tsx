import { StyleSheet } from "react-native";
import { TextInput, type TextInputProps } from "react-native-paper";
import { COLORS } from "../../utils/const-colors";

export default function OutlinedInput(props: TextInputProps) {
  return (
    <TextInput
      mode="outlined"
      style={styles.input}
      placeholderTextColor={"gray"}
      activeOutlineColor={COLORS.palette.orange}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    maxWidth: "80%",
    marginVertical: 8,
  },
});
