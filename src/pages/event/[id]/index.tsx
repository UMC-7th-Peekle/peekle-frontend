import * as S from './style';
import { useEffect, useState } from 'react';
import {
  ToggleHeart,
  BottomSheet,
  ImageSlider,
  Backward,
  Button,
  MetaTag,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_SHARE } from '@/constants/event';
import { SHARE_TITLE, SHARE_DESCRIPTION } from '@/constants/common';

import {
  copyToClipboard,
  getStartDateTime,
  formatSchedules,
  toast,
  priceFormatter,
} from '@/utils';
import { useBottomSheetStore } from '@/stores';
import { events } from '@/sample-data/event';
import { EventSchedule } from '@/types/event';
import { useId } from '@/hooks';
import usePostScrapEvent from '../hooks/mutation/usePostScrapEvent';
import useDeleteScrapEvent from '../hooks/mutation/useDeleteScrapEvent';
import { getCategoryName } from '@/utils/eventFormatter';
import getFirstSentence from '@/utils/getFirstSentence';

const EventDetailPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { scrapEvent, isScrapEventPending } = usePostScrapEvent();
  const { deleteScrap, isDeleteScrapPending } = useDeleteScrapEvent();
  const id = useId(); //url에서 뽑은 id
  const event = events.find((event) => event.eventId === BigInt(id));

  useEffect(() => {
    if (!id || !event) return;
    const firstSentence =
      event.content.match(/[^.!?]+[.!?]/)?.[0] ?? event.content;
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', event.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', firstSentence);
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute('content', event.eventImages[0]?.imageUrl ?? '');
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', window.location.href);
    document.title = event.title;
  }, [id, event]);

  if (!id || !event) {
    return null;
  }

  const {
    eventId,
    eventImages,
    title,
    eventSchedules,
    datailAddress,
    eventUrl,
    center,
    categoryId,
    price,
    content,
  } = event;

  const startDateTime = getStartDateTime(eventSchedules[0] as EventSchedule);
  const time = formatSchedules(eventSchedules[0] as EventSchedule);
  const thumbnailImg = eventImages?.[0]?.imageUrl;

  const handleShareKakao = () => {
    let kakao;
    if (window.Kakao) kakao = window.Kakao;
    // Kakao 초기화 체크
    if (kakao && !kakao.isInitialized())
      kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
    if (kakao) {
      console.log('카카오톡 공유', kakao);
      // 현재 링크 가져오기
      const currentURL = window.location.href;
      // 이벤트 정보 가져오기
      const eventTitleEl = document.querySelector('event-title') as HTMLElement;
      const eventTitle = eventTitleEl ? eventTitleEl.innerText : SHARE_TITLE;
      const eventContentEl = document.querySelector(
        'event-content',
      ) as HTMLElement;
      const eventContent = getFirstSentence(
        eventContentEl ? eventContentEl.innerText : SHARE_DESCRIPTION,
      );
      const eventThumbnailImg =
        thumbnailImg ?? import.meta.env.VITE_KAKAO_SHARE_BASE_IMAGE;
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: eventTitle,
          description: eventContent,
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
  };

  const handleCopyLink = () => {
    copyToClipboard(window.location.href);
    toast('링크가 복사되었습니다.');
  };

  const handleCopyAddress = () => {
    copyToClipboard(datailAddress);
    toast('주소가 복사되었습니다.');
  };

  const handleToggleHeart = async (eventId: bigint) => {
    if (!isScrapEventPending && !isDeleteScrapPending) {
      if (isScraped) {
        // 스크랩이 되어있다면 삭제
        await deleteScrap(eventId);
        setIsScraped(false);
      } else {
        // 스크랩이 되어있지 않다면 추가
        await scrapEvent(eventId);
        setIsScraped(true);
      }
    }
  };

  const handleMoveSiteClick = async () => {
    window.open(eventUrl, '_blank'); // 새 탭에서 열기
  };

  return (
    <>
      <MetaTag
        title={title}
        description={content?.slice(0, 50)}
        imgSrc={thumbnailImg}
        url={window.location.href}
      />

      <S.Header>
        <Backward size={'28px'} />
        <S.ShareBtn
          onClick={() => setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_SHARE)}
        />
      </S.Header>

      <S.MainSection>
        <ImageSlider images={eventImages} title={title} />
        <S.InfoContainer>
          <S.Category>{getCategoryName(categoryId)}</S.Category>
          <S.Title className="event-title">{title}</S.Title>
          <S.Line />
          <S.Info>
            <S.InfoRow>
              <S.DateIcon />
              <S.InfoRowText>{startDateTime}</S.InfoRowText>
            </S.InfoRow>
            <S.InfoRow>
              <S.TimeIcon />
              <S.InfoRowText>{time}</S.InfoRowText>
            </S.InfoRow>
            <S.InfoRow>
              <S.LocationIcon />
              <S.InfoRowText>{center}</S.InfoRowText>
              <S.ArrowDownIcon
                $isExpanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
              />
              <S.DetailAddressCard $isExpanded={isExpanded}>
                <S.DetailAddressTextWrapper>
                  <S.DetailAddressText>{datailAddress}</S.DetailAddressText>
                  <S.DetailAddressCopyText onClick={handleCopyAddress}>
                    주소 복사
                  </S.DetailAddressCopyText>
                </S.DetailAddressTextWrapper>
              </S.DetailAddressCard>
            </S.InfoRow>
            <S.InfoRow>
              <S.CoinIcon />
              <S.InfoRowText>{priceFormatter(price)}</S.InfoRowText>
            </S.InfoRow>
          </S.Info>
        </S.InfoContainer>
      </S.MainSection>
      <S.Separator />

      <S.ContentContainer>
        <S.ContentTitle>상세 정보</S.ContentTitle>
        <S.Content className="event-content">{content}</S.Content>
      </S.ContentContainer>

      <S.BottomContainer>
        <ToggleHeart
          isActive={isScraped}
          onClick={() => handleToggleHeart(eventId)}
          size={24}
          borderColor={'theme.color.gray[500]'}
        />
        {eventUrl ? (
          <Button color="primary500" size="small" onClick={handleMoveSiteClick}>
            홈페이지 이동
          </Button>
        ) : null}
      </S.BottomContainer>

      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_SHARE} shouldShowLine={true}>
        <S.ShareContainer>
          <S.ShareTitle>공유하기</S.ShareTitle>
          <S.ShareOptions>
            <S.ShareOption onClick={handleShareKakao}>
              <S.KakaoIcon />
              <S.ShareOptionText>카카오톡</S.ShareOptionText>
              {/* api 연동 필요 */}
            </S.ShareOption>
            <S.ShareOption onClick={handleCopyLink}>
              <S.LinkIcon />
              <S.ShareOptionText>링크 복사하기</S.ShareOptionText>
            </S.ShareOption>
          </S.ShareOptions>
        </S.ShareContainer>
      </BottomSheet>
    </>
  );
};

export default EventDetailPage;
