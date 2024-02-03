import { Link, Route } from "expo-router";
import { Text } from "react-native-paper";
import { COLORS } from "../../../../shared/utils/const-colors";

export const TextWithLink = ({
  text,
  linkText,
  linkPath,
}: {
  text: string;
  linkText: string;
  linkPath: Route<string>;
}) => {
  return (
    <Text variant="labelLarge">
      {text}{" "}
      <Text variant="bodyLarge">
        <Link style={{ color: COLORS.variants.blue }} replace href={linkPath}>
          {linkText}
        </Link>
      </Text>
    </Text>
  );
};

//TODO
