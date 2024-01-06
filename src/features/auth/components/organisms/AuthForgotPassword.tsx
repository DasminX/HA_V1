import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import VariantButton from "../../../../shared/components/button/VariantButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { AuthServiceFactory } from "../../services/api/AuthServiceImpl";
import OutlinedInput from "../../../../shared/components/input/OutlinedInput";

export const AuthForgotPassword = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // const response = await AuthServiceFactory.getProperInstance("FORGOT_PASSWORD").authorize(email)
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      router.replace("/auth/login");
    }
  };
  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.remindPassword`)}</Text>
      <OutlinedInput
        label={t("auth.email")}
        keyboardType="email-address"
        placeholder="user@example.com"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <VariantButton onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
        {t(`common.send`)}
      </VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
});
