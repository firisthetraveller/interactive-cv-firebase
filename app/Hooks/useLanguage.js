import { useState } from "react";

const navigatorLang = navigator.language.split("-")[0];
const supportedLanguages = ["en", "fr"];
const isSupportedLanguage = (l) => supportedLanguages.includes(l)
const defaultLanguage = isSupportedLanguage(navigatorLang) ? navigatorLang : "en";

const useLanguage = () => {
    const [language, setLanguage] = useState(defaultLanguage);

    const switchLanguage = (l) => {
        setLanguage(isSupportedLanguage(l) ? l : language);
    }

    const getSupportedLanguages = () => {
        return [...supportedLanguages];
    }

    const localeText = (key) => {
        return key ? (key[language] ? key[language] : key) : "";
    }

    return { language, localeText, switchLanguage, getSupportedLanguages };
}

export default useLanguage;