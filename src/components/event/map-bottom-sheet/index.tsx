import * as S from './style';
import { useState, useEffect, useRef } from 'react';
import { BottomSheetProps } from '@/types/common';
import { useBottomSheetStore } from '@/stores';

const MapBottomSheet = ({ id, children }: BottomSheetProps) => {
  const { activeBottomSheet, setActiveBottomSheet, setBottomSheetHeight } =
    useBottomSheetStore();
  const isOpen = activeBottomSheet === id;
  const [isRendered, setIsRendered] = useState(false); // 애니메이션 후 렌더링 상태

  const bottomSheetRef = useRef<HTMLDivElement>(null); // 높이 기록용

  // 애니메이션 후 렌더링 상태 관리
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true); // BottomSheet가 열릴 때 바로 렌더링
      return;
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false); // 애니메이션 종료 후 렌더링 중지
      }, 300); // 애니메이션 시간 (300ms)
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  useEffect(() => {
    if (bottomSheetRef.current) {
      const calculatedHeight = bottomSheetRef.current.offsetHeight;
      setBottomSheetHeight(calculatedHeight);
    }
  }, [setBottomSheetHeight]);

  if (!isRendered) return null;

  return (
    <S.BottomSheet $isOpen={isOpen}>
      <S.LineIcon />
      <button onClick={() => setActiveBottomSheet(null)}>
        임시 맵바텀시트 닫기 버튼
      </button>
      {children}
    </S.BottomSheet>
  );
};

export default MapBottomSheet;
