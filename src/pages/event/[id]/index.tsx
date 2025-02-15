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
import useShareKakao from '../hooks/useShareKakao';

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
import getSubstring from '@/utils/getSubstring';

const EventDetailPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { scrapEvent, isScrapEventPending } = usePostScrapEvent();
  const { deleteScrap, isDeleteScrapPending } = useDeleteScrapEvent();
  const id = useId(); //url에서 뽑은 id
  const event = events.find((event) => event.eventId === BigInt(id));
  const { handleShareKakao } = useShareKakao();

  const thumbnailImg = event?.eventImages?.[0]?.imageUrl;

  useEffect(() => {
    if (!id || !event) return;
    const firstSentence = getSubstring(event.content);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', event.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', firstSentence);
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute('content', thumbnailImg ?? '');
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', window.location.href);
    document.title = event.title;
  }, [id, event, thumbnailImg]);

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
            <S.ShareOption onClick={() => handleShareKakao(thumbnailImg)}>
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
