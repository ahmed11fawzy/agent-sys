import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Simple translations for demo
const resources = {
  en: {
    translation: {
      welcome: "Welcome back",
      Settings: "Settings",
      language: "Language",
      theme: "Theme",
      dark: "Dark",
      light: "Light",
      arabic: "Arabic",
      english: "English",
      logout: "Logout",
      signin:"Sign In",
      Home:"Home",
      Inbox:"Inbox",
      Calendar:"Calendar",
      Search:"Search",
      alballd:"Al Balad",
      agent:"Agent",
      

    }
  },
  ar: {
    translation: {
      welcome: "مرحباً بعودتك",
      Settings: "الإعدادات",
      language: "اللغة",
      theme: "المظهر",
      dark: "ليلي",
      light: "نهاري",
      arabic: "العربية",
      english: "الإنجليزية",
      logout: "تسجيل الخروج",
      signin:"تسجيل الدخول",
      Home:"الرئيسية",
      Inbox:"البريد",
      Calendar:"التقويم",
      Search:"بحث",
      alballd:"البلد",
      agent:"مندوب",    
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ar', // Initial load
    fallbackLng: 'ar',
    interpolation: { escapeValue: false }
  });

export default i18n;