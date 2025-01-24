import { useRef, useEffect } from 'react';
import { BottomSheetMetrics } from '@/types/common';
import { BS_MIN_Y, BS_MAX_Y, BS_MIN_TOP } from '@/constants/common';

const useBottomSheet = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  // Touch Event 핸들러들을 등록
  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀시트를 움직임
      if (!isContentAreaTouched) {
        return true;
      }

      if (touchMove.movingDirection === 'down') {
        // 스크롤을 더 이상 올릴 것이 없다면, 바텀시트를 자유롭게 움직일 수 있음
        // Safari 에서는 bounding 효과 때문에 scrollTop 이 음수가 될 수 있어 0보다 이하로 검사
        if (contentRef.current?.scrollTop)
          return contentRef.current.scrollTop <= 0;
      }

      return false;
    };

    // 유저가 바텀시트를 터치했을 때 터치 포인트, 바텀시트 위치 저장
    const handleTouchStart = (e: TouchEvent) => {
      console.log(sheetRef.current?.getBoundingClientRect().y);
      console.log('touchStart');
      const { touchStart } = metrics.current;

      touchStart.sheetY = sheetRef.current?.getBoundingClientRect().y ?? 0;
      touchStart.touchY = e.touches[0].clientY;
    };

    // 진행방향과 이동거리를 계산하고 바텀시트의 위치를 갱신
    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouchY = e.touches[0].clientY;
      let prevTouchY = touchMove.prevTouchY;

      if (prevTouchY === undefined) {
        prevTouchY = touchStart.touchY;
      }

      // 화면 좌표계에서 Y 값은 위에서 아래로 갈수록 커짐
      if (prevTouchY < currentTouchY) {
        touchMove.movingDirection = 'down';
      }

      if (prevTouchY > currentTouchY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        // content에서 scroll이 발생하는 것을 막음
        e.preventDefault();

        // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
        const touchOffset = currentTouchY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        // nextSheetY 는 BS_MIN_Y, BS_MAX_Y 사이의 값으로 clamp
        if (nextSheetY <= BS_MIN_Y) {
          nextSheetY = BS_MIN_Y;
        }

        if (nextSheetY >= BS_MAX_Y) {
          nextSheetY = BS_MAX_Y;
        }

        // sheet 위치 갱신
        sheetRef.current?.style.setProperty(
          'transform',
          `translateY(${nextSheetY - BS_MAX_Y}px)`,
        );
      } else {
        // 컨텐츠를 스크롤하는 동안에는 body가 스크롤되는 것을 막음
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      // 스냅 애니메이션
      const currentSheetY = sheetRef.current?.getBoundingClientRect().y;

      if (currentSheetY !== BS_MIN_TOP) {
        if (touchMove.movingDirection === 'down') {
          sheetRef.current?.style.setProperty('transform', 'translateY(0)');
        }

        if (touchMove.movingDirection === 'up') {
          sheetRef.current?.style.setProperty(
            'transform',
            `translateY(${BS_MAX_Y - BS_MIN_Y}px)`,
          );
        }
        // metrics 초기화.
        metrics.current = {
          touchStart: {
            sheetY: 0,
            touchY: 0,
          },
          touchMove: {
            prevTouchY: 0,
            movingDirection: 'none',
          },
          isContentAreaTouched: false,
        };
      }
    };

    sheetRef.current?.addEventListener('touchstart', handleTouchStart);
    sheetRef.current?.addEventListener('touchmove', handleTouchMove);
    sheetRef.current?.addEventListener('touchend', handleTouchEnd);

    const cleanup = () => {
      sheetRef.current?.removeEventListener('touchstart', handleTouchStart);
      sheetRef.current?.removeEventListener('touchmove', handleTouchMove);
      sheetRef.current?.removeEventListener('touchend', handleTouchEnd);
    };

    return cleanup;
  }, [sheetRef]);

  // content 영역을 터치하는 것을 기록
  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };

    contentRef.current?.addEventListener('touchstart', handleTouchStart);

    const cleanup = () => {
      contentRef.current?.removeEventListener('touchstart', handleTouchStart);
    };

    return cleanup;
  }, [contentRef]);

  return { sheetRef, contentRef };
};

export default useBottomSheet;
