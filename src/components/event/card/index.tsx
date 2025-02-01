import * as S from './style';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { EventCardProps } from '@/types/event';
import { events } from '@/sample-data/event';
import { EventData } from '@/types/event';
import { priceFormatter } from '@/utils';

export const EventCard = ({ id, onClick }: EventCardProps) => {
  const navigate = useNavigate();

  const eventInfo = events.find((event: EventData) => event.eventId === id);
  if (!eventInfo) return;

  const { eventImages, title, location, price } = eventInfo;

  const handleCardClick = () => {
    navigate(`/event/${id}`);
    onClick?.();
  };

  return (
    <S.EventCard onClick={handleCardClick}>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.SubInfoWrapper>
          <S.SubInfo>{location}</S.SubInfo>
          <S.SubInfo>{priceFormatter(price)}</S.SubInfo>
        </S.SubInfoWrapper>
      </S.Info>
      <S.ImageContainer>
        {eventImages && eventImages.length > 0 && eventImages[0].imageUrl ? (
          <S.Image src={eventImages[0].imageUrl} alt={`${title}-img`} />
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
