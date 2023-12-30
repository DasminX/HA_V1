import { Redirect, useRootNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function FakeRootIndexForRedirectPurpose() {
  const navigation = useRootNavigation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!navigation?.isReady) return;

    setReady(true);
  }, [navigation?.isReady]);

  if (ready) return <Redirect href="/dashboard/" />;
  return <ActivityIndicator />;
}
