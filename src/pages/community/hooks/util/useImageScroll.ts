import { useRef, useState } from 'react';
import { CommunityDetailArticle } from '../query/useGetCommunityDetail';

export default function useImageScroll({
  article,
}: {
  article: CommunityDetailArticle;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // ✅ 터치 시작 (스와이프 시작)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // ✅ 터치 종료 (스와이프 방향 결정)
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // 👉 오른쪽으로 스와이프 (다음 이미지)
      if (currentIndex < article.articleImages.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (touchStartX.current - touchEndX.current < -50) {
      // 👈 왼쪽으로 스와이프 (이전 이미지)
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  return {
    setCurrentIndex,
    selectedImageIndex,
    setSelectedImageIndex,
    handleTouchStart,
    handleTouchEnd,
    currentIndex,
    touchEndX,
    touchStartX,
  };
}
