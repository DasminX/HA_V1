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

type FirebaseCallSuccess = {
  mode: keyof typeof AUTH_MODE_ENUM;
  status: AUTH_RESPONSE_ENUM.SUCCESS;
  message: `auth.successful${string}`;
};

export class AuthServiceFactory {
  public static getProperInstance(mode: keyof typeof AUTH_MODE_ENUM) {
    switch (mode) {
      case AUTH_MODE_ENUM.LOGIN:
        return new AuthServiceLogin();
      case AUTH_MODE_ENUM.REGISTER:
        return new AuthServiceRegister();
      case AUTH_MODE_ENUM.FORGOT_PASSWORD:
        return new AuthServiceForgotPassword();
      case AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD:
        return new AuthServiceChangeForgottenPassword();
    }
  }
}

// TODO CHANGE TO BACKEND API
export class AuthServiceLogin extends AuthServiceAbstract {
  public async authorize(
    email: string,
    password: string,
  ): Promise<(FirebaseCallSuccess & { token: string; expiresIn: number }) | FirebaseAuthError> {
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
      };
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
  ): Promise<FirebaseCallSuccess | FirebaseAuthError> {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

      await sendEmailVerification(response.user);

      return {
        mode: AUTH_MODE_ENUM.REGISTER,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulSignup",
      };
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.REGISTER);
    }
  }
}

export class AuthServiceForgotPassword extends AuthServiceAbstract {
  public async authorize(
    _email: string,
    _password: string,
  ): Promise<FirebaseCallSuccess | FirebaseAuthError> {
    try {
      // todo

      return {
        mode: AUTH_MODE_ENUM.FORGOT_PASSWORD,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulForgotPassword",
      };
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.FORGOT_PASSWORD);
    }
  }
}

export class AuthServiceChangeForgottenPassword extends AuthServiceAbstract {
  public async authorize(
    _email: string,
    _password: string,
  ): Promise<FirebaseCallSuccess | FirebaseAuthError> {
    try {
      // todo
      return {
        mode: AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulChangeForgottenPassword",
      };
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD);
    }
  }
}
