import * as S from './style';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { EventCardProps } from '@/types/event';
import { events } from '@/sample-data/event';
import { EventData } from '@/types/event';

export const EventCard = ({ id, onClick }: EventCardProps) => {
  const navigate = useNavigate();

  const eventInfo = events.find((event: EventData) => event.id === id);
  if (!eventInfo) return;

  const { images, title, location, price } = eventInfo;

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
          <S.SubInfo>{price}</S.SubInfo>
        </S.SubInfoWrapper>
      </S.Info>
      <S.ImageContainer>
        {images[0] ? ( // 썸네일 이미지 있으면 그거 쓰기
          <S.Image src={images[0]} alt={`${title}-img`} />
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
            height="30px"
            style={{ borderRadius: '4px' }}
          />
          <Skeleton width="75px" height="30px" />
        </S.SubInfoWrapper>
      </S.Info>
      <S.ImageContainer>
        <Skeleton width="96px" height="96px" style={{ borderRadius: '8px' }} />
      </S.ImageContainer>
    </S.EventCard>
  );
};
