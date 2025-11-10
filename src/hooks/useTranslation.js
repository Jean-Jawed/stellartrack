import { useStore } from '../store';
import fr from '../i18n/fr.json';
import en from '../i18n/en.json';

const translations = { fr, en };

export const useTranslation = () => {
  const language = useStore((state) => state.language);
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t, language };
};
