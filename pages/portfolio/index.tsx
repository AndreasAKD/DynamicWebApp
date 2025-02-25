import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from '../../components/imagemodal';

type PortfolioProps = {
  messages: Record<string, string>;
};

const Portfolio = ({}: PortfolioProps) => {
  const images = [
    '/images/sample1.jpg',
    '/images/sample2.jpg',
    '/images/sample3.jpg',
    '/images/sample4.JPG',
    '/images/gårdsjön.jpg',
  ];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const t = useTranslations();

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8 pb-20 sm:p-20">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left">
          <p className="mb-2 mt-20 text-[40px] leading-[30px]">
            {t('portfolioDescription')}
          </p>
          <p className="mb-2 mt-5">
            {t('portfolioInstructions')}
          </p>
        </ol>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative w-full h-64 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={src}
                alt={`Sample Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </main>
      {selectedImageIndex !== null && (
        <ImageModal
          images={images}
          currentIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
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

export default Portfolio;