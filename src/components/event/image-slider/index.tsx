import * as S from './style';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePagination } from '@/components';
import { ImageSliderProps } from '@/types/event';

const ImageSlider = ({ images, title = 'event' }: ImageSliderProps) => {
  // sequence 오름차순으로 정렬된 이미지 배열
  const sortedImages = useMemo(
    () => [...images].sort((a, b) => a.sequence - b.sequence),
    [images],
  );
  const imageUrls = sortedImages.map((img) => img.imageUrl);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction] = useState(0);

  const slideImage = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0 || newIndex >= imageUrls.length) return prevIndex;
      return newIndex;
    });
  };

  const hasImages = imageUrls.length > 0;
  const currentPage = hasImages ? currentIndex + 1 : 0;

  return (
    <S.ImageContainer>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -100) slideImage(1);
            if (info.offset.x > 100) slideImage(-1);
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {images[currentIndex] ? (
            <S.Image
              src={imageUrls[currentIndex]}
              alt={`${title}-img-${currentIndex}`}
            />
          ) : (
            <S.DefaultImageIcon />
          )}
        </motion.div>
      </AnimatePresence>
      {hasImages && (
        <S.FilePaginationWrapper>
          <FilePagination
            fileLength={images.length}
            currentPage={currentPage}
            onPrevPage={() => slideImage(-1)}
            onNextPage={() => slideImage(1)}
          />
        </S.FilePaginationWrapper>
      )}
    </S.ImageContainer>
  );
};

export default ImageSlider;
