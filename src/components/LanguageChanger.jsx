import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

export default function LanguageChanger() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "ar", label: "العربية", flag: "🇪🇬" },
    ];

    // Handle i18n.language sometimes being "en-US" etc.
    const activeCode = i18n.language?.split("-")[0] || "en";
    const currentLang = languages.find((l) => l.code === activeCode) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100/50 rounded-full border border-gray-200 transition-all duration-200 active:scale-95"
            >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span className="hidden sm:inline font-semibold">{currentLang.label}</span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-[100] animate-in fade-in zoom-in slide-in-from-top-2 duration-300 origin-top-right">
                    <div className="p-2 space-y-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                    activeCode === lang.code
                                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30 font-semibold"
                                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                                }`}
                            >
                                <span className="text-lg leading-none">{lang.flag}</span>
                                <span className="flex-1 text-left rtl:text-right">{lang.label}</span>
                                {activeCode === lang.code && (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
