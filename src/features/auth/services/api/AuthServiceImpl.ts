import { AUTH_RESPONSE_ENUM } from "./../../utils/enums";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import { AuthServiceInstance } from "./AuthService";
import { AUTH_TOKEN, AUTH_TOKEN_EXPIRESIN } from "../../../../shared/utils/async-storage-consts";
import { toTimestamp } from "../../../../shared/utils/date-helpers";

type FirebaseLoginSuccess = Readonly<{
  mode: AUTH_MODE_ENUM.LOGIN;
  status: AUTH_RESPONSE_ENUM.SUCCESS;
  message: "auth.successfulSignin";
  token: string;
  expiresIn: number;
}>;

type FirebaseRegisterSuccess = Readonly<{
  mode: AUTH_MODE_ENUM.REGISTER;
  status: AUTH_RESPONSE_ENUM.SUCCESS;
  message: "auth.successfulSignup";
}>;

type FirebaseAuthError = Readonly<{
  status: AUTH_RESPONSE_ENUM.ERROR;
  message: string;
}>;

export class AuthServiceFactory {
  public static getProperInstance(mode: keyof typeof AUTH_MODE_ENUM) {
    switch (mode) {
      case AUTH_MODE_ENUM.LOGIN:
        return new AuthServiceLogin();
      case AUTH_MODE_ENUM.REGISTER:
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
      const { user } = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

      if (!user.emailVerified) {
        throw "EMAIL_VERIFICATION";
      }

      const result = await user.getIdTokenResult();
      const expiresInTimestamp = toTimestamp(result.expirationTime);

      await AsyncStorage.multiSet([
        [AUTH_TOKEN, result.token],
        [AUTH_TOKEN_EXPIRESIN, expiresInTimestamp.toString()],
      ]);

      return {
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        mode: AUTH_MODE_ENUM.LOGIN,
        token: result.token,
        expiresIn: expiresInTimestamp,
        message: "auth.successfulSignin",
      } as FirebaseLoginSuccess;
    } catch (error) {
      return {
        status: AUTH_RESPONSE_ENUM.ERROR,
        mode: AUTH_MODE_ENUM.LOGIN,
        message: `${error}`,
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
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        mode: AUTH_MODE_ENUM.REGISTER,
        message: "auth.successfulSignup",
      } as FirebaseRegisterSuccess;
    } catch (error) {
      return {
        status: AUTH_RESPONSE_ENUM.ERROR,
        mode: AUTH_MODE_ENUM.REGISTER,
        message: `${error}`,
      } as FirebaseAuthError;
    }
  }
}
