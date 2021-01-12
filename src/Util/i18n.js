

import I18n from "i18n-js";

import vi from "../language/vi";
import en from "../language/en";
import zh from "../language/zh";


I18n.fallbacks = true;
I18n.translations = {
  vi,
  en,
  zh
};

module.exports = I18n;
