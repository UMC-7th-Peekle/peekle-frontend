import * as S from './style';
import { forwardRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { EventCardProps } from '@/types/event';
import { getDistrict, priceFormatter } from '@/utils';

export const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  ({ id, eventCardData, onClick }, ref) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isSearchPage = pathname === ROUTES.EVENT_SEARCH;
    if (!eventCardData) return;

    const { eventImages, title, eventLocation, price } = eventCardData;

    // 주소가 있을때만 행정구 표시
    const district =
      eventLocation?.address && getDistrict(eventLocation.address);

    const thumbnailImage =
      eventImages && eventImages.length > 0 && eventImages[0].imageUrl;

    const isAdmin = true; // 임시 변수
    const handleCardClick = () => {
      if (isAdmin) {
        navigate(`/admin/event/${id}`);
      } else {
        navigate(`/event/${id}`, { state: { isSearchPage } });
      }
      onClick?.();
    };

    return (
      <S.EventCard onClick={handleCardClick} ref={ref}>
        <S.Info>
          <S.Title>{title}</S.Title>
          <S.SubInfoWrapper>
            {district && <S.SubInfo>{district}</S.SubInfo>}
            <S.SubInfo>{priceFormatter(price)}</S.SubInfo>
          </S.SubInfoWrapper>
        </S.Info>
        <S.ImageContainer>
          {thumbnailImage && !imageError ? (
            <S.Image
              src={thumbnailImage}
              alt={`${title}-img`}
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          ) : (
            <S.DefaultImageIcon />
          )}
        </S.ImageContainer>
      </S.EventCard>
    );
  },
);

export const EventCardSkeleton = () => {
  return (
    <S.EventCard>
      <S.Info>
        <Skeleton width="242px" height="24px" style={{ borderRadius: '4px' }} />
        <S.SubInfoWrapper>
          <Skeleton
            width="53px"
            height="30px"
            style={{ borderRadius: '4px' }}
          />
          <Skeleton width="70px" height="30px" />
        </S.SubInfoWrapper>
      </S.Info>
      <S.ImageContainer>
        <Skeleton width="96px" height="96px" style={{ borderRadius: '8px' }} />
      </S.ImageContainer>
    </S.EventCard>
  );
};
