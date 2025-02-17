import * as S from './style';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BottomSheetProps } from '@/types/common';
import { useBottomSheetStore, useNavbarStore } from '@/stores';
import { routesWithNavbar } from '@/layouts/outlet/const';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const bottomSheetVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const BottomSheet = ({
  id,
  shouldShowLine = false,
  children,
}: BottomSheetProps) => {
  const { activeBottomSheet, setActiveBottomSheet } = useBottomSheetStore();
  const isOpen = activeBottomSheet === id;
  const { shouldShowNavbar, setShouldShowNavbar } = useNavbarStore();

  useEffect(() => {
    // 현재 경로가 routesWithNavbar에 포함되어 있으면 네비게이션바 표시
    const shouldShow = isOpen
      ? false
      : routesWithNavbar.includes(location.pathname);
    if (shouldShow !== shouldShowNavbar) {
      setShouldShowNavbar(shouldShow);
    }
  }, [isOpen, shouldShowNavbar, setShouldShowNavbar]);

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={() => setActiveBottomSheet(null)}
        >
          <S.BottomSheet
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bottomSheetVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {shouldShowLine && (
              <S.BottomSheetHeader>
                <S.lineIcon />
              </S.BottomSheetHeader>
            )}
            <S.BottomSheetContent>{children}</S.BottomSheetContent>
          </S.BottomSheet>
        </S.Overlay>
      )}
    </AnimatePresence>
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
