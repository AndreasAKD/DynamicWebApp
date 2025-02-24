import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

type AboutProps = {
  messages: Record<string, string>;
};

const About = ({}: AboutProps) => {
    const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8 pb-20 sm:p-20 mt-[10vh]">
        <div className="text-sm text-center sm:text-left font-medium">
          <p className="mb-2">{t('purpose')}</p>
          <p>{t('aboutDescription')}</p>
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
