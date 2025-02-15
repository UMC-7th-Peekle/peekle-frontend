import { slides } from '@/constants/onboarding';
import { useEffect, useState } from 'react';

export default function useSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ 2초마다 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return { currentIndex };
}
