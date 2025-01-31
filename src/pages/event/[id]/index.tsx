import * as S from './style';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  ToggleHeart,
  BottomSheet,
  ImageSlider,
  Backward,
  Button,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_SHARE } from '@/constants/event';
import {
  copyToClipboard,
  getStartDateTime,
  formatSchedules,
  toast,
} from '@/utils';
import { useBottomSheetStore } from '@/stores';
import { events } from '@/sample-data/event';
import { usePostScrapEvent } from '@/hooks/event/mutation/usePostScrapEvent';
import { EventSchedule } from '@/types/event';
import { priceFormatter } from '@/utils';

const EventDetailPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { scrapEvent, isPending } = usePostScrapEvent();
  const { id } = useParams();
  if (!id) return;
  const event = events.find((event) => event.eventId === BigInt(id));
  if (!event) return;

  const {
    eventId,
    eventImages,
    title,
    eventSchedules,
    datailAddress,
    eventUrl,
    center,
    category,
    price,
    content,
  } = event;

  const startDateTime = getStartDateTime(eventSchedules[0] as EventSchedule);
  const time = formatSchedules(eventSchedules[0] as EventSchedule);

  const handleShareKakao = () => {
    console.log('카카오톡 로그인 클릭');
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
    if (!isPending) {
      await scrapEvent(eventId);
    }
  };

  const handleMoveSiteClick = async () => {
    window.open(eventUrl, '_blank'); // 새 탭에서 열기
  };

  return (
    <>
      <S.Header>
        <Backward size={'28px'} />
        <S.ShareBtn
          onClick={() => setActiveBottomSheet(BOTTOM_SHEET_ID_EVENT_SHARE)}
        />
      </S.Header>

      <S.MainSection>
        <ImageSlider images={eventImages} title={title} />
        <S.InfoContainer>
          <S.Category>{category.name}</S.Category>
          <S.Title>{title}</S.Title>
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
        <S.Content>{content}</S.Content>
      </S.ContentContainer>

      <S.BottomContainer>
        <ToggleHeart
          isActive={false}
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
