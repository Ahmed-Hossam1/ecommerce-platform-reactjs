/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import ProductCard from "../features/products/components/ProductCard";
import { filterProducts, getCategories } from "../features/products/services/productService";
import { useSearchParams } from "react-router-dom";
import SkeletonLoader from "../components/Skeleton";
import { useTranslation } from "react-i18next";

export default function ProductsPage() {
    const { t } = useTranslation("products");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams , setSearchParams ] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState( searchParams.get("category") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "title");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 8;

    useEffect(()=> {
    let params = {};
    if (search) params.search = search;
    if (selectedCategory) params.category = selectedCategory;
    if (sortBy !== "title") params.sortBy = sortBy;
    if (sortOrder !== "asc") params.sortOrder = sortOrder;
    if (currentPage > 1) params.currentPage = currentPage;
    setSearchParams(params);
    },[search , selectedCategory , sortBy , sortOrder , currentPage])

    useEffect(() => {
        async function load() {
            setLoading(true);

                const searchedProducts = await filterProducts({ search , category: selectedCategory , sortBy , sortOrder , limit: productsPerPage , page : currentPage  });
                setProducts(searchedProducts.data);
                setTotalPages(searchedProducts.totalPages);
                setCurrentPage(searchedProducts.page);
                
                const cats = await getCategories();
            setCategories(cats);
            // Simulate a short loading time so the spinner is visible
            setTimeout(() => setLoading(false), 200);
        }
        load();
    }, [search , selectedCategory , sortBy , sortOrder , currentPage]);


 useEffect(() => {
    setCurrentPage(1);
}, [search, selectedCategory, sortBy, sortOrder]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
                <p className="text-gray-500">
                    {t("subtitle", { count: products.length })}
                </p>
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                        <option value="">{t("allCategories")}</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={`${sortBy}-${sortOrder}`}
                        onChange={(e) => {
                            const [by, order] = e.target.value.split("-");
                            setSortBy(by);
                            setSortOrder(order);
                        }}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                        <option value="title-asc">{t("sortNameAZ")}</option>
                        <option value="title-desc">{t("sortNameZA")}</option>
                        <option value="price-asc">{t("sortPriceLow")}</option>
                        <option value="price-desc">{t("sortPriceHigh")}</option>
                        <option value="rating-desc">{t("sortRatingBest")}</option>
                    </select>
                </div>
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <SkeletonLoader /> 
            ) : (
                <>
                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="text-center py-16">
                            <svg
                                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <p className="text-gray-500 text-lg">{t("noProductsFound")}</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                {t("previous")}
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum
                                            ? "bg-primary-600 text-white"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            )}
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                {t("next")}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
