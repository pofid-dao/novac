import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { storage } from '@/common/storage';
import en_US from '@/locales/en_US.json';
import zh_CN from '@/locales/zh_CN.json';
import ko_KR from '@/locales/ko_KR.json';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en_US: {
        translation: en_US,
      },
      zh_CN: {
        translation: zh_CN,
      },
      ko_KR: {
        translation: ko_KR,
      },
    },
    fallbackLng: storage.get(storage.keys.language)
      ? storage.get(storage.keys.language)
      : 'en_US',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
