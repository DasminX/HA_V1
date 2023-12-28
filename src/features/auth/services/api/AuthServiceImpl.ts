import { AUTH_MODE_ENUM } from "../../utils/enums";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FirebaseAuthError,
  FirebaseLoginSuccess,
  FirebaseRegisterSuccess,
} from "../../utils/types";
import { AuthServiceInstance } from "./AuthService";

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
    password: string
  ): Promise<FirebaseLoginSuccess | FirebaseAuthError> {
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const result = await response.user.getIdTokenResult();

      await AsyncStorage.setItem("DX_HA_APP_V1_AUTHTOKEN", result.token);

      return {
        status: "success",
        mode: "LOGIN",
        token: result.token,
        expiresIn: new Date(result.expirationTime).getTime(),
        message: "auth.successfulSignin",
      } as FirebaseLoginSuccess;
    } catch (error) {
      return {
        status: "error",
        mode: "LOGIN",
        cause: `${error}` ?? "Unknown",
      } as FirebaseAuthError;
    }
  }
}

export class AuthServiceRegister extends AuthServiceInstance {
  public async authorize(
    email: string,
    password: string
  ): Promise<FirebaseRegisterSuccess | FirebaseAuthError> {
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      await sendEmailVerification(response.user);

      return {
        status: "success",
        mode: "REGISTER",
        message: "auth.successfulSignup",
      } as FirebaseRegisterSuccess;
    } catch (error) {
      return {
        status: "error",
        mode: "REGISTER",
        cause: `${error}` ?? "Unknown",
      } as FirebaseAuthError;
    }
  }
}
