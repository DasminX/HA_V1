import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AUTH_TOKEN, AUTH_TOKEN_EXPIRESIN } from "../utils/async-storage-consts";
import { useAppDispatch } from "./redux-hooks";
import { setToken } from "../../features/auth/slices/authSlice";
import { validateAuth } from "../utils/validate-auth";

const getAuthTokenProperties = async () => {
  const authTokenProperties = await AsyncStorage.multiGet([AUTH_TOKEN, AUTH_TOKEN_EXPIRESIN]);
  if (!authTokenProperties.length) return [];

  const transformedATP = authTokenProperties.map((tuple) => ({
    key: tuple[0],
    value: tuple[1],
  }));

  const propsAuthToken = transformedATP.find((obj) => obj.key === AUTH_TOKEN)?.value;
  const propsAuthTokenExp = transformedATP.find((obj) => obj.key === AUTH_TOKEN_EXPIRESIN)?.value;
  return [propsAuthToken, propsAuthTokenExp];
};

export const useLoadAuth = () => {
  const dispatch = useAppDispatch();
  const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = useState(false);

  useEffect(() => {
    getAuthTokenProperties()
      .then(([token, expiresIn]) => {
        if (token && expiresIn && validateAuth({ token, expiresIn: +expiresIn })) {
          dispatch(setToken({ token: token, expiresIn: +expiresIn }));
        }
      })
      .catch((e) => {
        console.log(`Error in getting auth token properties: ${e}`);
      })
      .finally(() => {
        setIsAsyncStorageLoaded(true);
      });
  }, [dispatch, isAsyncStorageLoaded]);

  return [isAsyncStorageLoaded];
};
