import * as S from './style';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import {
  BottomSheet,
  MetaTag,
  ToggleHeart,
  ImageSlider,
  Backward,
  Button,
} from '@/components';
import {
  useId,
  useGetEventDetail,
  useShareKakao,
  useToggleScrapEvent,
} from '@/hooks';
import {
  copyToClipboard,
  getStartDateTime,
  formatSchedules,
  getSubstring,
  toast,
} from '@/utils';
import { BOTTOM_SHEET_ID_EVENT_SHARE } from '@/constants/event';
import { ROUTES } from '@/constants/routes';
import {
  useBottomSheetStore,
  useMapStore,
  useEventsStore,
  useSearchBottomSheetStore,
} from '@/stores';

export const EventDetailPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { handleShareKakao } = useShareKakao();
  const { setSelectedEvent } = useMapStore();
  const { events } = useEventsStore();
  const navigate = useNavigate();
  const { state } = useLocation();

  const isAdmin = true; // 임시 변수

  // 검색 페이지에선 지도 보기 클릭시 BS 닫아놓기
  const { setIsSearchBSOpen } = useSearchBottomSheetStore();

  // 스크랩 토글
  const { toggleScrap } = useToggleScrapEvent();

  //디테일 가져오기
  const id = useId(); //url에서 뽑은 id
  const { data } = useGetEventDetail(BigInt(id));
  const eventDetail = data.success?.event;

  const thumbnailImg = eventDetail?.eventImages?.[0]?.imageUrl;

  useEffect(() => {
    if (!id || !eventDetail) return;
    const firstSentence = getSubstring(eventDetail.content);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', eventDetail.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', firstSentence);
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute(
        'content',
        thumbnailImg ?? import.meta.env.VITE_BASE_IMAGE,
      );
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', window.location.href);
    document.title = eventDetail.title;
  }, [id, thumbnailImg, eventDetail]);

  if (!id || !eventDetail) {
    return null;
  }

  const {
    eventId,
    eventImages,
    content,
    title,
    eventSchedules,
    // eventLocation: { detail: detailAddress, buildingName },
    category: { name: categoryName },
    price,
    eventUrl,
    // isScrapped,
  } = eventDetail;

  // 데이터 포맷팅
  const startDateTime = getStartDateTime(eventSchedules[0]);
  const time = formatSchedules(eventSchedules[0]);

  const detailAddress = '임시 주소';
  const buildingName = '임시 건물명';

  const handleCopyAddress = () => {
    copyToClipboard(detailAddress);
    toast('주소가 복사되었습니다.');
  };

  const handleToggleHeart = async (eventId: bigint) => {
    // await toggleScrap({ eventId, isScrapped });
    await toggleScrap({ eventId, isScrapped: false });
  };

  const handleMoveSiteClick = async () => {
    window.open(eventUrl, '_blank'); // 새 탭에서 열기
  };

  const handleCopyLink = () => {
    copyToClipboard(window.location.href);
    toast('링크가 복사되었습니다.');
  };

  const handleViewMap = () => {
    const eventData = events.find((event) => event.eventId === eventId);
    if (eventData) {
      setSelectedEvent(eventData);
      if (state?.isSearchPage) {
        setIsSearchBSOpen(false);
        navigate(ROUTES.EVENT_SEARCH);
      } else {
        navigate(ROUTES.EVENT_MAP);
      }
    }
  };

  const handleEditEvent = () => {
    navigate(ROUTES.EVENT_EDIT);
  };

  const handleDeleteEvent = () => {};

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
          <S.Category>{categoryName}</S.Category>
          <S.TitleContainer>
            <S.Title className="event-title">{title}</S.Title>
            {isAdmin && (
              <S.AdminIconContainer>
                <S.EditIcon onClick={handleEditEvent} />
                <S.DeleteIcon onClick={handleDeleteEvent} />
              </S.AdminIconContainer>
            )}
          </S.TitleContainer>
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
                  {!isAdmin && (
                    <S.ViewMapText onClick={handleViewMap}>
                      지도 보기
                    </S.ViewMapText>
                  )}
                </S.DetailAddressTextWrapper>
              </S.DetailAddressCard>
            </S.InfoRow>
            <S.InfoRow>
              <S.CoinIcon />
              <S.InfoRowText>{price}</S.InfoRowText>
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
          // isActive={isScrapped}
          isActive={false}
          onClick={() => handleToggleHeart(eventId)}
          size={24}
        />
        {eventUrl ? (
          <Button color="primary500" size="small" onClick={handleMoveSiteClick}>
            홈페이지 이동
          </Button>
        ) : null}
      </S.BottomContainer>

      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_SHARE}>
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

export const EventDetailPageskeleton = () => {
  return (
    <S.SkeletonContainer>
      <S.Header>
        <Skeleton width="28px" height="28px" />
        <Skeleton width="28px" height="28px" />
      </S.Header>

      <S.MainSection>
        <div style={{ width: '100%' }}>
          <Skeleton width="100%" height="270px" />
        </div>
        <S.InfoContainer>
          <Skeleton
            width="30px"
            height="23px"
            style={{ borderRadius: '4px' }}
          />
          <Skeleton
            width="267px"
            height="32px"
            style={{ borderRadius: '4px' }}
          />
          <S.Line />
          <S.Info>
            {Array.from({ length: 4 }).map((_, i) => (
              <div style={{ width: '100%' }} key={i}>
                <Skeleton width="100%" height="24px" />
              </div>
            ))}
          </S.Info>
        </S.InfoContainer>
      </S.MainSection>

      <S.Separator />

      <S.ContentContainer>
        <Skeleton width="72px" height="32px" />
        <div style={{ width: '100%' }}>
          <Skeleton width="100%" height="100px" />
        </div>
      </S.ContentContainer>

      <S.BottomContainer>
        <Skeleton width="24px" height="24px" />
        <div style={{ width: '100%' }}>
          <Skeleton width="100%" height="56px" />
        </div>
      </S.BottomContainer>
    </S.SkeletonContainer>
  );
};
