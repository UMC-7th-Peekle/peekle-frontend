import * as S from './style';
import { forwardRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { EventCardProps } from '@/types/event';

export const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  ({ id, eventData, onClick }, ref) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isSearchPage = pathname === ROUTES.EVENT_SEARCH;
    if (!eventData) return;

    const {
      eventImages,
      title,
      eventLocation: { sigungu },
      price,
    } = eventData;

    const thumbnailImage =
      eventImages && eventImages.length > 0 && eventImages[0].imageUrl;

    const handleCardClick = () => {
      navigate(`/event/${id}`, { state: { isSearchPage } });
      onClick?.();
    };

    return (
      <S.EventCard onClick={handleCardClick} ref={ref}>
        <S.Info>
          <S.Title>{title}</S.Title>
          <S.SubInfoWrapper>
            <S.SubInfo>{sigungu}</S.SubInfo>
            <S.SubInfo>{price}</S.SubInfo>
          </S.SubInfoWrapper>
        </S.Info>
        <S.ImageContainer>
          {thumbnailImage && !imageError ? (
            <S.Image
              src={thumbnailImage}
              alt={`${title}-img`}
              onError={() => setImageError(true)}
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
