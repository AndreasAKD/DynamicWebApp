import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

type AboutProps = {
  messages: Record<string, string>;
};

const About = ({}: AboutProps) => {
    const t = useTranslations();
    
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <main className="flex-grow p-8 pb-20 sm:p-20 mt-[10vh]">
          <div className="text-xl text-center sm:text-left font-medium" style={{ color: 'var(--foreground)' }}>
            <p className="mb-2" style={{ color: 'var(--primary)' }}>{t('about')}</p>
            <p style={{ color: 'var(--secondary)' }}>{t('aboutDescription')}</p>
          </div>
        </main>
      </div>
    );
  };

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const messages = await import(`../../messages/${locale}.json`);
  return {
    props: {
      messages: messages.default,
    },
  };
};

export default About
