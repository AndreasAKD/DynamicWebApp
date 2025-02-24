import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    trackMouse: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        onNext();
      } else if (event.key === "ArrowLeft") {
        onPrev();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".modal-content") === null) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div {...handlers} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <button
        className="absolute top-4 right-4 text-white text-4xl"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="relative w-full h-full max-w-4xl max-h-[90vh] modal-content flex items-center justify-center px-4">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          width={800}
          height={600}
          objectFit="contain"
          className="cursor-pointer"
          onClick={onClose}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default ImageModal;