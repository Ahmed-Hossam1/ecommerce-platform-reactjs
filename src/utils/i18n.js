import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";

// English
import enHome from "../locales/en/home.json";
import enCommon from "../locales/en/common.json";

// Arabic
import arHome from "../locales/ar/home.json";
import arCommon from "../locales/ar/common.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const userDefaultLang = navigator.language;

const resources = {
  en: { home: enHome, common: enCommon },
  ar: { home: arHome, common: arCommon },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: userDefaultLang,
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: ["home", "common", "blog", "auth"], // i tell i18next that i have 3 namespaces home, blog, auth so instead of repeating home:state.title i can write state.title
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  localStorage.setItem("lang", lng);
});

const checkLang = () => {
  const lang = localStorage.getItem("language");
  if (lang) {
    i18n.changeLanguage(lang);
  }
};

checkLang();
