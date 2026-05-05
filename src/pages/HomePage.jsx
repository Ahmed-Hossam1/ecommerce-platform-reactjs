import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
} from "../features/products/services/productService";
import ProductCard from "../features/products/components/ProductCard";
import SkeletonLoader from "../components/Skeleton";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const products = await getProducts();
      const sorted = [...products].sort((a, b) => b.rating - a.rating);
      setFeaturedProducts(sorted.slice(0, 4));
      const cats = await getCategories();
      setCategories(cats);
      setLoading(false);
    }
    load();
  }, []);

  const categoryIcons = {
    Electronics: "⚡",
    Fashion: "👗",
    "Home & Kitchen": "🏠",
    Accessories: "⌚",
    Health: "💪",
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-primary-200 text-sm font-medium rounded-full backdrop-blur-sm mb-6">
              {t("hero.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              {t("hero.title")}
              <span className="block bg-linear-to-r from-primary-200 to-accent-400 bg-clip-text text-transparent">
                {t("hero.highlight")}
              </span>
            </h1>
            <h2 className="text-xl text-primary-200 mb-2">{t("welcome", { name: "John" })}</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed max-w-lg">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-lg shadow-primary-900/20 hover:shadow-xl"
              >
                {t("hero.shop")}
              </Link>
              <Link
                to="/products"
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                {t("hero.browse")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "24+", key: "products" },
              { value: "5", key: "categories" },
              { value: "Free", key: "shipping" },
              { value: "24/7", key: "support" },
            ].map((stat) => (
              <div key={stat.key}>
                <div className="text-2xl font-bold text-primary-600">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{t(`stats.${stat.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t("categories.title")}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            {t("categories.description")}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-3">{categoryIcons[cat] || "📦"}</div>
              <h3 className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                {cat}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t("products.title")}
              </h2>
              <p className="text-gray-500">
                {t("products.description")}
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              {t("products.viewAll")}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-linear-to-r from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("newsletter.title")}
            </h2>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              {t("newsletter.description")}
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-3 rounded-l-xl text-sm focus:outline-none border border-gray-200"
              />
              <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-r-xl hover:bg-gray-800 transition-colors text-sm">
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
