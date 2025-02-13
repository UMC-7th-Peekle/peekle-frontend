import { useCallback } from 'react';
import { getSubstring } from '@/utils';
import { SHARE_TITLE, SHARE_DESCRIPTION } from '@/constants/common';

const useShareKakao = () => {
  const handleShareKakao = useCallback((thumbnailImg?: string) => {
    let kakao;
    if (window.Kakao) kakao = window.Kakao;
    // Kakao 초기화 체크
    if (kakao && !kakao.isInitialized())
      kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
    if (kakao) {
      // 현재 링크 가져오기
      const currentURL = window.location.href;
      // 이벤트 정보 가져오기
      const eventTitleEl = document.querySelector(
        '.event-title',
      ) as HTMLElement;
      const eventTitle = eventTitleEl ? eventTitleEl.innerText : SHARE_TITLE;
      const eventContentEl = document.querySelector(
        '.event-content',
      ) as HTMLElement;
      const eventContent = eventContentEl
        ? getSubstring(eventContentEl.innerText)
        : SHARE_DESCRIPTION;
      const eventThumbnailImg =
        thumbnailImg ?? import.meta.env.VITE_KAKAO_SHARE_BASE_IMAGE;
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: eventTitle,
          description: eventContent,
          // description: '아메리카노, 빵, 케익, 아메리카노, 빵, 케익, 아메리카노, 빵, 케익',
          imageUrl: eventThumbnailImg,
          link: {
            mobileWebUrl: currentURL,
            webUrl: currentURL,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: currentURL,
              webUrl: currentURL,
            },
          },
        ],
        // 카카오톡 미설치 시 카카오톡 설치 경로이동
        installTalk: true,
      });
    }
  }, []);
  return { handleShareKakao };
};

export default useShareKakao;
