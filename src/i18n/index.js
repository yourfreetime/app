import { Platform, NativeModules } from "react-native";
import I18n from "i18n-js";
import en from "./en-US"; // importa o objeto de traduções para o idioma inglês
import pt from "./pt-BR"; // importa o objeto de traduções para o idioma português

const normalizeTranslate = {
  en_US: "en_US",
  pt_BR: "pt_BR",
  en: "en_US",
  pt_US: "pt_BR"
};

const getLanguageByDevice = () => {
  return Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
};

I18n.translations = {
  en_US: en,
  pt_BR: pt
};

const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize
  );
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = "en_US");
};

setLanguageToI18n();

export const t = key => I18n.t(key);
