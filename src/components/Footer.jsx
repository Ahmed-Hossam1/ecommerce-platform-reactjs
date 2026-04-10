import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation("common");
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-linear-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="text-xl font-bold text-white">ShopHub</span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t("footer.brandDescription")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h4>
                        <ul className="space-y-2">
                            {[
                                { to: "/products", label: t("footer.allProducts") },
                                { to: "/cart", label: t("footer.shoppingCart") },
                                { to: "/wishlist", label: t("navbar.wishlist") },
                                { to: "/compare", label: t("navbar.compare") },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t("footer.customerService")}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>{t("footer.contactUs")}</li>
                            <li>{t("footer.shippingPolicy")}</li>
                            <li>{t("footer.returnsExchanges")}</li>
                            <li>{t("footer.faq")}</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t("footer.stayUpdated")}</h4>
                        <p className="text-sm text-gray-400 mb-3">
                            {t("footer.newsletterText")}
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder={t("footer.emailPlaceholder")}
                                className="w-full flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                            />
                            <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-r-lg hover:bg-primary-700 transition-colors">
                                {t("buttons.subscribe")}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    <p className="mb-4">
                        This project is a part of the{" "}
                        <a
                            href="https://intern2grow.pages.dev/professional-programs/react-js-developer-2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300 transition-colors underline decoration-primary-900 underline-offset-4"
                        >
                            Professional Program of React.js Developer
                        </a>{" "}
                        on{" "}
                        <a
                            href="https://intern2grow.pages.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300 transition-colors underline decoration-primary-900 underline-offset-4"
                        >
                            Intern2Grow
                        </a>{" "}
                        developed by{" "}
                        <a
                            href="https://ahmed0saber.pages.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300 transition-colors underline decoration-primary-900 underline-offset-4"
                        >
                            Ahmed Saber
                        </a>{" "}
                        and implemented by
                        <a
                            href="https://portfolio-psi-opal-14.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium hover:text-primary-400 transition-colors underline decoration-gray-700 underline-offset-4"
                        >
                         Ahmed Hossam
                        </a>
                    </p>
                    {t("footer.copyright", { year: new Date().getFullYear() })}
                </div>
            </div>
        </footer>
    );
}
