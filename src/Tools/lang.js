const usedLanguage = navigator.language.split("-")[0];
export const language = ["en", "fr"].includes(usedLanguage) ? usedLanguage : "en";

export const localeText = (key) => {
    return key ? (key[language] ? key[language] : key) : "";
}