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
import { copyToClipboard, toast, priceFormatter } from '@/utils';
import { useBottomSheetStore } from '@/stores';
import { events } from '@/sample-data/event';

const EventDetailPage = () => {
  const [isLiked, setIsLiked] = useState(false); // 임시 하트 토글
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { id } = useParams();
  const event = events.find((event) => event.id === id);
  if (!event) return;

  const { images, title, StartDateTime, time, center, price, description } =
    event;

  const handleShareKakao = () => {
    console.log('카카오톡으로 공유하기'); // api 연동 필요
  };

  const handleCopyLink = () => {
    copyToClipboard(window.location.href);
    toast('링크가 복사되었습니다.');
  };

  const handleToggleHeart = () => {
    setIsLiked(!isLiked);
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
        <ImageSlider images={images} title={title} />
        <S.InfoContainer>
          <S.Category>{'임시 category'}</S.Category>
          <S.Title>{title}</S.Title>
          <S.Line />
          <S.Info>
            <S.InfoRow>
              <S.DateIcon />
              <S.InfoRowText>{StartDateTime}</S.InfoRowText>
            </S.InfoRow>
            <S.InfoRow>
              <S.TimeIcon />
              <S.InfoRowText>{time}</S.InfoRowText>
            </S.InfoRow>
            <S.InfoRow>
              <S.LocationIcon />
              <S.InfoRowText>{center}</S.InfoRowText>
            </S.InfoRow>
            <S.InfoRow>
              <S.CoinIcon />
              <S.InfoRowText>
                {price === '0' ? '무료' : `${priceFormatter(price)}원`}
              </S.InfoRowText>
            </S.InfoRow>
          </S.Info>
        </S.InfoContainer>
      </S.MainSection>
      <S.Separator />

      <S.DescriptionContainer>
        <S.DescriptionTitle>상세 정보</S.DescriptionTitle>
        <S.Description>{description}</S.Description>
      </S.DescriptionContainer>

      <S.BottomContainer>
        <ToggleHeart
          isActive={isLiked}
          onClick={handleToggleHeart}
          size={24}
          borderColor={'theme.color.gray[500]'}
        />
        <Button color="primary500" size="small">
          신청하기
        </Button>
      </S.BottomContainer>

      <BottomSheet id={BOTTOM_SHEET_ID_EVENT_SHARE}>
        <S.ShareContainer>
          <S.ShareTitle>공유하기</S.ShareTitle>
          <S.ShareOptions>
            <S.ShareOption onClick={handleShareKakao}>
              <S.KakaoIcon />
              <S.ShareOptionText>카카오톡으로 공유하기</S.ShareOptionText>
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
