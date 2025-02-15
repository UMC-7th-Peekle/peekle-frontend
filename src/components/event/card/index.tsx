import * as S from './style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { EventCardProps } from '@/types/event';
import { priceFormatter } from '@/utils';

export const EventCard = ({ id, eventData, onClick }: EventCardProps) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
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
    navigate(`/event/${id}`);
    onClick?.();
  };

  return (
    <S.EventCard onClick={handleCardClick}>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.SubInfoWrapper>
          <S.SubInfo>{sigungu}</S.SubInfo>
          <S.SubInfo>{priceFormatter(price)}</S.SubInfo>
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
};

export const EventCardSkeleton = () => {
  return (
    <S.EventCard>
      <S.Info>
        <Skeleton width="242px" height="24px" style={{ borderRadius: '4px' }} />
        <S.SubInfoWrapper>
          <Skeleton
            width="53px"
            height="20px"
            style={{ borderRadius: '4px' }}
          />
          <Skeleton width="70px" height="20px" />
        </S.SubInfoWrapper>
      </S.Info>
      <S.ImageContainer>
        <Skeleton width="96px" height="96px" style={{ borderRadius: '8px' }} />
      </S.ImageContainer>
    </S.EventCard>
  );
};
