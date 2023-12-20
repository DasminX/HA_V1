import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as resources from "../translations";

export const initializeI18N = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3", // Check if this property is needed based on your i18n library version
    resources: Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {}
    ),
    lng: "pl",
  });
};
