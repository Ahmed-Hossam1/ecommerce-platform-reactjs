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

const getInitialLanguage = () => {
  const saved = localStorage.getItem("app_lang");
  if (saved && (saved === "en" || saved === "ar")) return saved;

  const browserLang = navigator.language.split("-")[0];
  return browserLang === "ar" ? "ar" : "en";
};

const resources = {
  en: { home: enHome, common: enCommon, cart: enCart, checkout: enCheckout, compare: enCompare, wishlist: enWishlist, products: enProducts },
  ar: { home: arHome, common: arCommon, cart: arCart, checkout: arCheckout, compare: arCompare, wishlist: arWishlist, products: arProducts },
};

const initialLang = getInitialLanguage();

// Set initial direction and lang attribute immediately
document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = initialLang;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: initialLang,
    ns: ["home", "common", "cart", "checkout", "compare", "wishlist", "products", "blog", "auth"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  localStorage.setItem("app_lang", lng);
});

export default i18n;
