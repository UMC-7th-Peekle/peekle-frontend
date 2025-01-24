import * as S from './style';
import { useState, useEffect } from 'react';
import { BottomSheetProps } from '@/types/common';
import { useBottomSheetStore, useNavbarStore } from '@/stores';
import useBottomSheet from '@/hooks/common/useBottomSheet';

const BottomSheet = ({ id, children }: BottomSheetProps) => {
  const { activeBottomSheet, setActiveBottomSheet } = useBottomSheetStore();
  const isOpen = activeBottomSheet === id;
  const [isRendered, setIsRendered] = useState(false); // 애니메이션 후 렌더링 상태
  const { setShouldShowNavbar } = useNavbarStore();
  const { sheetRef, contentRef } = useBottomSheet();

  // 애니메이션 후 렌더링 상태 관리
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true); // BottomSheet가 열릴 때 바로 렌더링
      setShouldShowNavbar(false); // 네비게이션바 숨기기
      return;
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false); // 애니메이션 종료 후 렌더링 중지
        setShouldShowNavbar(true);
      }, 300); // 애니메이션 시간 (300ms)
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered, setShouldShowNavbar]);

  if (!isRendered) return null;

  // console.log(sheetRef.current?.getBoundingClientRect().y);

  return (
    <S.Overlay onClick={() => setActiveBottomSheet(null)}>
      <S.BottomSheet
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        $isOpen={isOpen}
      >
        <S.BottomSheetHeader>
          <S.lineIcon />
        </S.BottomSheetHeader>
        <S.BottomSheetContent ref={contentRef}>{children}</S.BottomSheetContent>
      </S.BottomSheet>
    </S.Overlay>
  );
};

export default BottomSheet;

/**
 * 사용 예시
 * import { BottomSheet, Button } from '@/components'
 *
 * <Button onClick={() => setActiveBottomSheet('sheet1')}>Open Sheet 1</Button>
 *
 * <BottomSheet id="sheet1">
 *  <S.Content>
 *    blabla
 *  </S.Content>
 * </BottomSheet>
 */
