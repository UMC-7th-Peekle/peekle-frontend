import * as S from './style';
import { useState, useEffect } from 'react';
import { BottomSheetProps } from '@/types/common';
import { Portal } from '@/components';
import { useBottomSheetStore } from '@/stores';

const BottomSheet = ({ id, children }: BottomSheetProps) => {
  const { activeBottomSheet, setActiveBottomSheet } = useBottomSheetStore();
  const isOpen = activeBottomSheet === id;
  const [isRendered, setIsRendered] = useState(false); // 애니메이션 후 렌더링 상태

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

  if (!isRendered) return null;

  return (
    <Portal onClose={() => setActiveBottomSheet(null)} type="other-portal">
      <S.BottomSheet $isOpen={isOpen}>
        <S.LineIcon />
        {children}
      </S.BottomSheet>
    </Portal>
  );
};

export default BottomSheet;

/**
 * 사용 예시
 * import { BottomSheet } from '@/components'
 *
 * <button onClick={() => setActiveBottomSheet('sheet1')}>Open Sheet 1</button>
 *
 * <BottomSheet id="sheet1">
 *  <S.Content>
 *    blabla
 *  </S.Content>
 * </BottomSheet>
 */
