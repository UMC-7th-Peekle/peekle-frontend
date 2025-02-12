import * as S from './style';
import { useState } from 'react';
import {
  ToggleHeart,
  BottomSheet,
  ImageSlider,
  Backward,
  Button,
  MetaTag,
} from '@/components';
import { BOTTOM_SHEET_ID_EVENT_SHARE } from '@/constants/event';
import {
  copyToClipboard,
  getStartDateTime,
  formatSchedules,
  toast,
  priceFormatter,
} from '@/utils';
import { useBottomSheetStore } from '@/stores';
import { useId } from '@/hooks';
import { EventSchedule } from '@/types/event';
import usePostScrapEvent from '../hooks/mutation/usePostScrapEvent';
import useDeleteScrapEvent from '../hooks/mutation/useDeleteScrapEvent';
// import useGetEventDetail from '../hooks/query/useGetEventDetail';
import { getCategoryName } from '@/utils/eventFormatter';
import { events } from '@/sample-data/event';

const EventDetailPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { scrapEvent, isScrapEventPending } = usePostScrapEvent();
  const { deleteScrap, isDeleteScrapPending } = useDeleteScrapEvent();
  const id = useId(); //url에서 뽑은 id
  const event = events.find((event) => String(event.eventId) === id);

  // 디테일 가져오기
  // const { data } = useGetEventDetail(BigInt(id));

  // useEffect(() => {
  //   if (!id || !event) return;
  //   const firstSentence =
  //     event.content.match(/[^.!?]+[.!?]/)?.[0] ?? event.content;
  //   document
  //     .querySelector('meta[property="og:title"]')
  //     ?.setAttribute('content', event.title);
  //   document
  //     .querySelector('meta[property="og:description"]')
  //     ?.setAttribute('content', firstSentence);
  //   document
  //     .querySelector('meta[property="og:image"]')
  //     ?.setAttribute('content', event.eventImages[0]?.imageUrl ?? '');
  //   document
  //     .querySelector('meta[property="og:url"]')
  //     ?.setAttribute('content', window.location.href);
  //   document.title = event.title;
  // }, [id, event]);

  if (!id || !event) {
    return null;
  }

  const {
    eventId,
    eventImages,
    title,
    eventSchedules,
    eventLocation: { detail: detailAddress, buildingName },
    categoryId,
    price,
  } = event;

  const eventUrl =
    'https://github.com/UMC-7th-Peekle/peekle-frontend/issues/85';
  const content = `참여자 특전\n\n① 2025년 동작50플러스센터 프리스티지 커뮤니티(오픈단톡방) 초대\n② 관련 프로그램(교육훈련, 일자리) 우선 안내 및 우선 신청 기회부여\n③ 일자리 참여시 가산점 부여(서류 면제 등)\n④ 각종 이벤트 쿠폰 지급(카페, 강의 할인)\n\n※ 강좌수료 시 수료자에게 오픈 단톡방 안내링크 발송\n※ 우선신청기회는 오픈단톡방 통해 별도 안내\n※ 일자리참여 가산점 부여는 일관련 교육 및 공공일자리 등 공통.`;

  const startDateTime = getStartDateTime(eventSchedules[0] as EventSchedule);
  const time = formatSchedules(eventSchedules[0] as EventSchedule);

  const handleShareKakao = () => {
    console.log('카카오톡 공윺 클릭');
  };

  const handleCopyLink = () => {
    copyToClipboard(window.location.href);
    toast('링크가 복사되었습니다.');
  };

  const handleCopyAddress = () => {
    if (detailAddress) {
      copyToClipboard(detailAddress);
      toast('주소가 복사되었습니다.');
    } else console.log('주소가 null임');
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
        description={''?.slice(0, 50)}
        imgSrc={eventImages?.[0]?.imageUrl}
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
              <S.InfoRowText>{buildingName}</S.InfoRowText>
              <S.ArrowDownIcon
                $isExpanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
              />
              <S.DetailAddressCard $isExpanded={isExpanded}>
                <S.DetailAddressTextWrapper>
                  <S.DetailAddressText>{detailAddress}</S.DetailAddressText>
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
