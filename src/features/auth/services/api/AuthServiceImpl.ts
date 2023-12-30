import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import {
  type FirebaseAuthError,
  type FirebaseLoginSuccess,
  type FirebaseRegisterSuccess,
} from "../../utils/types";
import { AuthServiceInstance } from "./AuthService";
import { AUTH_TOKEN, AUTH_TOKEN_EXPIRESIN } from "../../../../shared/utils/async-storage-consts";

export class AuthServiceFactory {
  public static getProperInstance(mode: keyof typeof AUTH_MODE_ENUM) {
    switch (mode) {
      case "LOGIN":
        return new AuthServiceLogin();
      case "REGISTER":
        return new AuthServiceRegister();
    }
  }
}

export class AuthServiceLogin extends AuthServiceInstance {
  public async authorize(
    email: string,
    password: string,
  ): Promise<FirebaseLoginSuccess | FirebaseAuthError> {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const result = await response.user.getIdTokenResult();
      const expiresInTimestamp = new Date(result.expirationTime).getTime();

      await AsyncStorage.multiSet([
        [AUTH_TOKEN, result.token],
        [AUTH_TOKEN_EXPIRESIN, expiresInTimestamp.toString()],
      ]);

      return {
        status: "success",
        mode: AUTH_MODE_ENUM.LOGIN,
        token: result.token,
        expiresIn: expiresInTimestamp,
        message: "auth.successfulSignin",
      } as FirebaseLoginSuccess;
    } catch (error) {
      return {
        status: "error",
        mode: AUTH_MODE_ENUM.LOGIN,
        cause: `${error}`,
      } as FirebaseAuthError;
    }
  }
}

// TODO ERRORY Z FIREBASE

export class AuthServiceRegister extends AuthServiceInstance {
  public async authorize(
    email: string,
    password: string,
  ): Promise<FirebaseRegisterSuccess | FirebaseAuthError> {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

      await sendEmailVerification(response.user);

      return {
        status: "success",
        mode: AUTH_MODE_ENUM.REGISTER,
        message: "auth.successfulSignup",
      } as FirebaseRegisterSuccess;
    } catch (error) {
      return {
        status: "error",
        mode: AUTH_MODE_ENUM.REGISTER,
        cause: `${error}`,
      } as FirebaseAuthError;
    }
  }
}
