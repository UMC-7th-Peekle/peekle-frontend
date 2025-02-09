import * as S from './style';
import { useState, useEffect } from 'react';
import { BottomSheetProps } from '@/types/common';
import { useBottomSheetStore, useNavbarStore } from '@/stores';
import { routesWithNavbar } from '@/layouts/outlet/const';

const BottomSheet = ({
  id,
  shouldShowLine = false,
  children,
}: BottomSheetProps) => {
  const { activeBottomSheet, setActiveBottomSheet } = useBottomSheetStore();
  const isOpen = activeBottomSheet === id;
  const [isRendered, setIsRendered] = useState(false); // 애니메이션 후 렌더링 상태
  const { shouldShowNavbar, setShouldShowNavbar } = useNavbarStore();

  // 애니메이션 후 렌더링 상태 관리
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true); // BottomSheet가 열릴 때 바로 렌더링
      if (shouldShowNavbar) setShouldShowNavbar(false); // 네비게이션바 숨기기
      return;
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false); // 애니메이션 종료 후 렌더링 중지
        // 현재 경로가 routesWithNavbar에 포함되어 있으면
        if (routesWithNavbar.includes(location.pathname)) {
          setShouldShowNavbar(true); // 네비게이션바 표시
        }
      }, 300); // 애니메이션 시간 (300ms)
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered, setShouldShowNavbar, shouldShowNavbar]);

  if (!isRendered) return null;

  return (
    <S.Overlay $isOpen={isOpen} onClick={() => setActiveBottomSheet(null)}>
      <S.BottomSheet onClick={(e) => e.stopPropagation()} $isOpen={isOpen}>
        {shouldShowLine && (
          <S.BottomSheetHeader>
            <S.lineIcon />
          </S.BottomSheetHeader>
        )}
        <S.BottomSheetContent>{children}</S.BottomSheetContent>
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
 * <BottomSheet id="sheet1" shouldShowLine={true} > // 라인이 필요하면 shouldShowLine true로
 *  <S.Content>
 *    blabla
 *  </S.Content>
 * </BottomSheet>
 */
