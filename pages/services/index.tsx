import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

type ServicesProps = {
  messages: Record<string, string>;
};

const Services = ({}: ServicesProps) => {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8 pb-20 sm:p-20 mt-[10vh]">
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <section className="text-center sm:text-left mt-16">
          <h1 className="text-4xl font-bold mb-8" style={{ color: 'white' }}>
            {t('ourServices')}</h1>
          <p className="text-lg mb-10">
            {t('servicesDescription')}
          </p>
          <ul className="list-disc list-inside">
            <li className="mb-2 font-bold">{t('service1')}</li>
            <li className="mb-2 font-bold">{t('service2')}</li>
            <li className="mb-2 font-bold">{t('service3')}</li>
            <li className="mb-2 font-bold">{t('service4')}</li>
          </ul>
        </section>
      </main>
      {/* <footer className="flex gap-6 flex-wrap items-center justify-center pb-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
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

export default Services;