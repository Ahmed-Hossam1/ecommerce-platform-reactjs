import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";

// English
import enHome from "../locales/en/home.json";
import enCommon from "../locales/en/common.json";
import enCart from "../locales/en/cart.json";
import enCheckout from "../locales/en/checkout.json";
import enCompare from "../locales/en/compare.json";
import enWishlist from "../locales/en/wishlist.json";
import enProducts from "../locales/en/products.json";

// Arabic
import arHome from "../locales/ar/home.json";
import arCommon from "../locales/ar/common.json";
import arCart from "../locales/ar/cart.json";
import arCheckout from "../locales/ar/checkout.json";
import arCompare from "../locales/ar/compare.json";
import arWishlist from "../locales/ar/wishlist.json";
import arProducts from "../locales/ar/products.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const userDefaultLang = navigator.language;

const resources = {
  en: { home: enHome, common: enCommon, cart: enCart, checkout: enCheckout, compare: enCompare, wishlist: enWishlist, products: enProducts },
  ar: { home: arHome, common: arCommon, cart: arCart, checkout: arCheckout, compare: arCompare, wishlist: arWishlist, products: arProducts },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: userDefaultLang,
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: ["home", "common", "cart", "checkout", "compare", "wishlist", "products", "blog", "auth"],
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
