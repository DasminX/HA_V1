import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";

import { PaperProvider } from "react-native-paper";
import { initializeI18N } from "../src/dict/initializer";
import { rootStore } from "../src/store/rootStore";
import RootNavigation from "../src/shared/containers/RootNavigation";
import { StatusBar } from "expo-status-bar";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "/dashboard/index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  initializeI18N();
  return (
    <StoreProvider store={rootStore}>
      <PaperProvider>
        <StatusBar style="light" />
        <RootNavigation />
      </PaperProvider>
    </StoreProvider>
  );
}
