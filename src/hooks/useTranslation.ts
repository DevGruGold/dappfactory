import { useLanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export const useTranslation = () => {
  const { language, toggleLanguage } = useLanguageContext();
  
  return {
    t: translations[language],
    language,
    toggleLanguage
  };
};
