import { useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  rootMargin?: string; // 뷰포트 기준 감지 범위 조절
  threshold?: number; // 요소의 몇 %가 보여야 감지할지 설정
}

const useInfiniteScroll = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  rootMargin = '100px', // 기본값: 100px 하단에서 미리 로드
  threshold = 0.1, // 기본값: 10%라도 보이면 감지
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: null, // 뷰포트 기준
          rootMargin, // 감지 범위
          threshold, // 감지 임계값
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage, rootMargin, threshold],
  );

  return { lastElementRef };
};

export default useInfiniteScroll;
