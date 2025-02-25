import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from '../components/imagemodal';

type HomeProps = {
  messages: Record<string, string>;
};

const Home = ({}: HomeProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const images = [
    '/images/sample6.JPG',
    '/images/sample7.JPG',
    '/images/sample8.JPG',
  ];

  const t = useTranslations();

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--hero-bg)'}}>
        <h1 className="text-3xl font-bold mb-4">Andreas Dahlgren</h1>
        <p className="text-xl mb-8 text-center" style={{ color: 'var(--text-primary)' }}>{t('lifeenthusiast')}</p>
        <a href="#portfolio" className="px-6 py-3 font-bold rounded-full hover:bg-blue-600 transition" style={{ color: 'var(--contact-text)', backgroundColor: 'var(--contact-bg)' }}>{t('viewSamples')}</a>
        <div className="mt-10 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="p-8 sm:p-20">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{t('aboutMe')}</h2>
        <p className="text-lg mb-4" style={{ color: 'var(--text-primary)' }}>{t('aboutDescription')}</p>
        <p className="text-lg" style={{ color: 'var(--text-primary)' }}>{t('skills')}</p>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="p-8 sm:p-20" style={{ color: 'var(--portfolio-text)' }}>
        <h2 className="text-3xl font-bold mb-8">{t('samplesOfWork')}</h2>
        <h3 className="text-xl font-bold mb-8">{t('seeMoreAtPortfolio')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-64 cursor-pointer" onClick={() => openImageModal(index)}>
              <Image src={src} alt={`Sample Image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="p-8 sm:p-20" style={{ backgroundColor: 'var(--contact-bg)', color: 'var(--contact-text)' }}>
        <h2 className="text-3xl font-bold mb-4">{t('contactMe')}</h2>
        <p className="text-lg mb-4">
          <a href="mailto:andreaskdahlgren@gmail.com" className="inline-flex items-center">
            <img src="/mail.svg" alt="Email" className="w-10 h-14" />
          </a>
        </p>
      </section>

      {selectedImageIndex !== null && (
        <ImageModal
          images={images}
          currentIndex={selectedImageIndex}
          onClose={closeImageModal}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const messages = await import(`../messages/${locale}.json`);
  return {
    props: {
      messages: messages.default,
    },
  };
};

export default Home;