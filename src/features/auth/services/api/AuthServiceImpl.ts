import { AUTH_RESPONSE_ENUM } from "./../../utils/enums";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import { AuthServiceAbstract } from "./AuthService";
import { AUTH_TOKEN, AUTH_TOKEN_EXPIRESIN } from "../../../../shared/utils/async-storage-consts";
import { toTimestamp } from "../../../../shared/utils/date-helpers";
import { FirebaseAuthError } from "../../utils/types";

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

export class AuthServiceLogin extends AuthServiceAbstract {
  public async authorize(
    email: string,
    password: string,
  ): Promise<FirebaseLoginSuccess | FirebaseAuthError> {
    try {
      const { user } = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

      if (!user.emailVerified) {
        throw AUTH_RESPONSE_ENUM.EMAIL_VERIFICATION_REQUIRED;
      }

      const result = await user.getIdTokenResult();
      const expiresInTimestamp = toTimestamp(result.expirationTime);

      await AsyncStorage.multiSet([
        [AUTH_TOKEN, result.token],
        [AUTH_TOKEN_EXPIRESIN, expiresInTimestamp.toString()],
      ]);

      return {
        mode: AUTH_MODE_ENUM.LOGIN,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulSignin",
        token: result.token,
        expiresIn: expiresInTimestamp,
      } as FirebaseLoginSuccess;
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.LOGIN);
    }
  }
}

// TODO ERRORY Z FIREBASE

export class AuthServiceRegister extends AuthServiceAbstract {
  public async authorize(
    email: string,
    password: string,
  ): Promise<FirebaseRegisterSuccess | FirebaseAuthError> {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

      await sendEmailVerification(response.user);

      return {
        mode: AUTH_MODE_ENUM.REGISTER,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulSignup",
      } as FirebaseRegisterSuccess;
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.REGISTER);
    }
  }
}
