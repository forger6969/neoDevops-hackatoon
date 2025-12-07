import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Импортируем JSON-файлы
import ru from "./ru.json";
import uz from "./uz.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translation: ru },
            uz: { translation: uz }
        },
        lng: "ru",                 // язык по умолчанию
        fallbackLng: "ru",         // если перевод не найден
        interpolation: {
            escapeValue: false       // React уже защищает от XSS
        }
    });

export default i18n;
