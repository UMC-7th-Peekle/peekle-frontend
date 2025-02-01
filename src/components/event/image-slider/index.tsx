// import * as S from './style';
// import { useState, useMemo, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Swiper as SwiperCore } from 'swiper';
// import { FilePagination } from '@/components';
// import { ImageSliderProps } from '@/types/event';

// const ImageSlider = ({ images, title = 'event' }: ImageSliderProps) => {
//   // sequence 오름차순으로 정렬된 이미지 배열
//   const sortedImages = useMemo(
//     () => [...images].sort((a, b) => a.sequence - b.sequence),
//     [images],
//   );
//   const imagesLength = sortedImages.length;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const swiperRef = useRef<SwiperCore | null>(null);
//   const onPrevPage = () => swiperRef.current?.slidePrev();
//   const onNextPage = () => swiperRef.current?.slideNext();

//   return (
//     <S.ImageContainer>
//       <Swiper
//         // slidesPerView={1}
//         // direction="horizontal"
//         loop={false}
//         onSwiper={(swiper) => (swiperRef.current = swiper)} // Swiper 인스턴스 저장
//         onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)} // 슬라이드 변경 시 인덱스 업데이트
//       >
//         {imagesLength > 0 ? (
//           sortedImages.map((img, index) => (
//             <SwiperSlide key={index}>
//               <S.Image src={img.imageUrl} alt={`${title}-img-${index}`} />
//             </SwiperSlide>
//           ))
//         ) : (
//           <SwiperSlide>
//             <S.DefaultImageIcon />
//           </SwiperSlide>
//         )}
//       </Swiper>
//       {imagesLength > 0 && (
//         <S.FilePaginationWrapper>
//           <FilePagination
//             fileLength={imagesLength}
//             currentPage={currentIndex + 1}
//             onPrevPage={onPrevPage}
//             onNextPage={onNextPage}
//           />
//         </S.FilePaginationWrapper>
//       )}
//     </S.ImageContainer>
//   );
// };

// export default ImageSlider;

import * as S from './style';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePagination } from '@/components';
import { ImageSliderProps } from '@/types/event';

const ImageSlider = ({ images, title = 'event' }: ImageSliderProps) => {
  // sequence 오름차순으로 정렬된 이미지 배열
  const sortedImages = useMemo(
    () => [...images].sort((a, b) => a.sequence - b.sequence),
    [images],
  );
  const imagesLength = sortedImages.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction] = useState(0);

  const slideImage = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0 || newIndex >= images.length) return prevIndex;
      return newIndex;
    });
  };

  const hasImages = imagesLength > 0;
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
          {sortedImages[currentIndex] ? (
            <S.Image
              src={sortedImages[currentIndex].imageUrl}
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
            fileLength={imagesLength}
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
