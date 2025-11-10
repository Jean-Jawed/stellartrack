import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-6 text-center text-sm text-gray-400 border-t border-white/10">
      <p>
        {t('footer.by')}{' '}
        <a
          href="https://javed.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 transition-colors font-medium"
        >
          Jawed
        </a>
      </p>
      <p className="mt-1">{t('footer.copyright')}</p>
    </footer>
  );
};
