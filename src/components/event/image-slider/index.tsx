import * as S from './style';
import { useMemo, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { FilePagination } from '@/components';
import { ImageSliderProps } from '@/types/event';

const ImageSlider = ({ images, title = 'event' }: ImageSliderProps) => {
  // sequence 오름차순으로 정렬된 이미지 배열
  const sortedImages = useMemo(
    () => [...images].sort((a, b) => a.sequence - b.sequence),
    [images],
  );
  const imagesLength = sortedImages.length;
  // 이미지 로드 에러 배열
  const [imageErrors, setImageErrors] = useState<boolean[]>(
    Array(imagesLength).fill(false),
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const DRAG_BUFFER = 20;

  const dragX = useMotionValue(0);

  const slideImage = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return 0;
      if (newIndex >= imagesLength) return imagesLength - 1;
      return newIndex;
    });
  };

  const handleDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER) slideImage(1);
    else if (x > DRAG_BUFFER) slideImage(-1);
  };

  const hasImages = imagesLength > 0;
  const currentPage = hasImages ? currentIndex + 1 : 0;

  return (
    <S.ImageSliderContainer>
      <S.ImageSliderWrapper>
        {hasImages ? (
          <S.ImageSlider
            style={{
              display: 'flex',
              width: `${imagesLength * 100}%`,
              x: dragX,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            animate={{
              translateX: `-${currentIndex * 100}%`,
            }}
            transition={{ duration: 0.2 }}
            onDragEnd={handleDragEnd}
          >
            {sortedImages.map((image, index) => (
              <S.ImageItem key={index}>
                {!imageErrors[index] ? (
                  <S.Image
                    src={image.imageUrl}
                    alt={`${title}-img-${index}`}
                    onError={() => {
                      setImageErrors((prev) => {
                        const newErrors = [...prev];
                        newErrors[index] = true;
                        return newErrors;
                      });
                    }}
                    onLoad={() => {
                      setImageErrors((prev) => {
                        const newErrors = [...prev];
                        newErrors[index] = false;
                        return newErrors;
                      });
                    }}
                  />
                ) : (
                  <S.DefaultImageIcon />
                )}
              </S.ImageItem>
            ))}
          </S.ImageSlider>
        ) : (
          <S.ImageItem>
            <S.DefaultImageIcon />
          </S.ImageItem>
        )}
      </S.ImageSliderWrapper>

      {hasImages && (
        <S.FilePaginationWrapper>
          <FilePagination
            fileLength={imagesLength}
            currentPage={currentPage}
            onPrevPage={() => slideImage(-1)}
            onNextPage={() => slideImage(1)}
          />
        </S.FilePaginationWrapper>
      )}
    </S.ImageSliderContainer>
  );
};

export default ImageSlider;
