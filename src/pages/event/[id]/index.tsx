import * as S from './style';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
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
  useRemoveEvent,
} from '@/hooks';
import {
  priceFormatter,
  copyToClipboard,
  formatDateToMonthDay,
  formatSchedules,
  getSubstring,
  toast,
  alert,
} from '@/utils';
import { BOTTOM_SHEET_ID_EVENT_SHARE } from '@/constants/event';
import { ROUTES } from '@/constants/routes';
import {
  useBottomSheetStore,
  useMapStore,
  useEventsStore,
  useSearchBottomSheetStore,
} from '@/stores';

export const EventDetailPage = ({ isAdmin }: { isAdmin: boolean }) => {
  const [isExpandedTime, setIsExpandedTime] = useState(false);
  const [isExpandedAddress, setIsExpandedAddress] = useState(false);
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { handleShareKakao } = useShareKakao();
  const { setSelectedEvent } = useMapStore();
  const { events } = useEventsStore();
  const navigate = useNavigate();
  const { state } = useLocation();
  // 공유된 페이지인지 확인
  const [searchParams] = useSearchParams();
  const isShared = searchParams.get('shared') === 'true';

  // 검색 페이지에선 지도 보기 클릭시 BS 닫아놓기
  const { setIsSearchBSOpen } = useSearchBottomSheetStore();

  // 이벤트 삭제
  const { removeEvent, isPending } = useRemoveEvent();

  //디테일 가져오기
  const id = useId(); //url에서 뽑은 id
  const { data } = useGetEventDetail(Number(id));
  const eventDetail = data.success?.event;

  const thumbnailImg = eventDetail?.eventImages?.[0]?.imageUrl;

  useEffect(() => {
    if (!id || !eventDetail) return;
    const firstSentence = getSubstring(
      eventDetail.content ?? '피클의 이벤트 정보',
    );
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

  // 스크랩 토글
  const { toggleScrap } = useToggleScrapEvent();
  const [isLocalScraped, setIsLocalScraped] = useState(
    eventDetail?.isScraped ?? false,
  );

  useEffect(() => {
    setIsLocalScraped(eventDetail?.isScraped ?? false);
  }, [eventDetail]);

  if (!id || !eventDetail) {
    return null;
  }

  const {
    eventId,
    eventImages,
    content,
    title,
    eventSchedules,
    eventLocation,
    category: { name: categoryName },
    price,
    eventUrl,
    applicationStart,
    applicationEnd,
  } = eventDetail;

  let startDate = '';
  let endDate = '';
  let schedules: string | string[] = '';
  // 데이터 포맷팅
  if (!applicationStart || !applicationEnd) {
    startDate = '시작 일자 없음';
    endDate = '종료 일자 없음';
    schedules = '스케줄 정보 없음';
  } else {
    startDate = formatDateToMonthDay(applicationStart, true, true);
    endDate = formatDateToMonthDay(applicationEnd, true, true);
    schedules = formatSchedules(
      eventSchedules,
      applicationStart,
      applicationEnd,
    );
  }

  const isManySchedules = Array.isArray(schedules) && schedules.length > 1;

  let address = '';
  let buildingName = '';
  if (eventLocation) {
    address = eventLocation.address ?? '주소 정보 없음';
    buildingName = eventLocation.buildingName ?? '센터 정보 없음';
  }

  const handleCopyAddress = () => {
    copyToClipboard(address);
    toast('주소가 복사되었습니다.');
  };

  const handleToggleHeart = async (eventId: number) => {
    await toggleScrap({ eventId, isScraped: isLocalScraped });
    setIsLocalScraped(!isLocalScraped); // UI 반영
  };

  const handleMoveSiteClick = async () => {
    window.open(eventUrl, '_blank'); // 새 탭에서 열기
  };

  const handleCopyLink = () => {
    // shared 쿼리 파라미터 추가
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set('shared', 'true');
    copyToClipboard(currentURL.href);
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
    navigate(`${ROUTES.EVENT_EDIT}/${eventId}`);
  };

  const handleDeleteEvent = () => {
    alert(
      `이벤트를 삭제하시면\n 복구할 수 없습니다.\n 정말 삭제 하시겠습니까?`,
      'warning',
      '아니오',
      '예',
      () => {},
      async () => {
        await removeEvent(eventId);
      },
    );
  };

  const handleCharacterLogoClick = () => {
    navigate(ROUTES.ONBOARDING);
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
        {isShared ? (
          <S.CharacterLogo onClick={handleCharacterLogoClick} />
        ) : (
          <Backward size={'28px'} />
        )}
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
                {isPending ? (
                  <p>삭제 중</p>
                ) : (
                  <S.DeleteIcon onClick={handleDeleteEvent} />
                )}
              </S.AdminIconContainer>
            )}
          </S.TitleContainer>
          <S.Line />
          <S.Info>
            <S.InfoRow>
              <S.DateIcon />
              <S.InfoRowText>
                {startDate} ~ {endDate}
              </S.InfoRowText>
            </S.InfoRow>
            <S.InfoRow>
              <S.TimeIcon />
              <S.InfoRowText>
                {isManySchedules
                  ? schedules[0]
                  : schedules || '스케줄 정보 없음'}
              </S.InfoRowText>
              {isManySchedules && (
                <S.ArrowDownIcon
                  $isExpanded={isExpandedTime}
                  onClick={() => setIsExpandedTime(!isExpandedTime)}
                />
              )}
            </S.InfoRow>
            {isManySchedules && isExpandedTime && Array.isArray(schedules) && (
              <>
                {schedules.map((schedule, index) => {
                  return index > 0 ? (
                    <S.InfoRow>
                      <S.TimeIcon />
                      <S.InfoRowText key={index}>{schedule}</S.InfoRowText>
                    </S.InfoRow>
                  ) : null;
                })}
              </>
            )}
            <S.InfoRow>
              <S.LocationIcon />
              <S.InfoRowText>{buildingName}</S.InfoRowText>
              <S.ArrowDownIcon
                $isExpanded={isExpandedAddress}
                onClick={() => setIsExpandedAddress(!isExpandedAddress)}
              />
              <S.DetailAddressCard $isExpanded={isExpandedAddress}>
                <S.DetailAddressTextWrapper>
                  <S.DetailAddressText>{address}</S.DetailAddressText>
                  {eventLocation.address && (
                    <S.DetailAddressCopyText onClick={handleCopyAddress}>
                      주소 복사
                    </S.DetailAddressCopyText>
                  )}
                  {!isAdmin && eventLocation.buildingName && (
                    <S.ViewMapText onClick={handleViewMap}>
                      지도 보기
                    </S.ViewMapText>
                  )}
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
        <S.Content className="event-content">
          {content ?? '상세 정보 없음'}
        </S.Content>
      </S.ContentContainer>

      <S.BottomContainer>
        <ToggleHeart
          isActive={isLocalScraped}
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
