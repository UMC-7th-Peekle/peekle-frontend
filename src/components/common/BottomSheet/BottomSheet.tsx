import * as S from './BottomSheet.styles';
import { ReactNode, useState, useEffect } from 'react';
import { ModalPortal } from '@/components';
import { useBottomSheetStore } from '@/stores';

const BottomSheet = ({ children }: { children: ReactNode }) => {
  const { isBottomSheetOpen, setIsBottomSheetOpen } = useBottomSheetStore();
  const [isRendered, setIsRendered] = useState(isBottomSheetOpen); // 애니메이션 후 렌더링 상태

  // 애니메이션 후 렌더링 상태 관리
  useEffect(() => {
    if (isBottomSheetOpen) {
      setIsRendered(true); // BottomSheet가 열릴 때 바로 렌더링
      return;
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false); // 애니메이션 종료 후 렌더링 중지
      }, 300); // 애니메이션 시간 (300ms)
      return () => clearTimeout(timer);
    }
  }, [isBottomSheetOpen, setIsBottomSheetOpen]);

  if (!isRendered) return null;

  return (
    <ModalPortal onClose={() => setIsBottomSheetOpen(false)}>
      <S.BottomSheet $isOpen={isBottomSheetOpen}>
        <S.LineIcon />
        {children}
      </S.BottomSheet>
    </ModalPortal>
  );
};

export default BottomSheet;

/**
 * 사용 예시
 * import { BottomSheet } from '@/components'
 *
 * <BottomSheet>
 *  <S.Content>
 *    blabla
 *  </S.Content>
 * </BottomSheet>
 */
