import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AUTH_TOKEN, AUTH_TOKEN_EXPIRESIN } from "../utils/async-storage-consts";
import { validateAuth } from "../utils/validate-auth";
import { useAuthStore } from "../slices/authStore";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";

const getAuthTokenProperties = async () => {
  const authTokenProperties = await AsyncStorage.multiGet([AUTH_TOKEN, AUTH_TOKEN_EXPIRESIN]);
  if (!authTokenProperties.length) return [];

  const transformedATP = authTokenProperties.map((tuple: KeyValuePair) => ({
    key: tuple[0],
    value: tuple[1],
  }));

  const propsAuthToken = transformedATP.find((obj) => obj.key === AUTH_TOKEN)?.value;
  const propsAuthTokenExp = transformedATP.find((obj) => obj.key === AUTH_TOKEN_EXPIRESIN)?.value;
  return [propsAuthToken, propsAuthTokenExp];
};

export const useLoadAuth = () => {
  const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = useState(false);
  const setTokenCredentials = useAuthStore((state) => state.setTokenCredentials);

  useEffect(() => {
    getAuthTokenProperties()
      .then(([token, expiresIn]) => {
        if (token && expiresIn && validateAuth(token, +expiresIn)) {
          setTokenCredentials({ token: token, expiresIn: +expiresIn });
        }
      })
      .catch((e) => {
        console.log(`Error in getting auth token properties: ${e}`);
      })
      .finally(() => {
        setIsAsyncStorageLoaded(true);
      });
  }, [setTokenCredentials, isAsyncStorageLoaded]);

  return [isAsyncStorageLoaded];
};
