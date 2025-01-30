import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { EventCardProps } from '@/types/event';
import { priceFormatter } from '@/utils';
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
          <S.SubInfo>
            {price === '0' ? '무료' : `${priceFormatter(price)}원`}
          </S.SubInfo>
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

export default EventCard;
