import * as S from './EventCard.styles';
import { EventCardProps } from '@/types/event';
import { formatDateToMonthDay, priceFormatter } from '@/utils';
import { events } from '@/sample-data/event';
import { EventData } from '@/types/event';
import { useNavigate } from 'react-router-dom';

export const EventCard = ({ id }: EventCardProps) => {
  const navigate = useNavigate();
  const eventInfo = events.find((event: EventData) => event.id === id);
  if (!eventInfo) return;

  const { images, title, startDate, endDate, location, price } = eventInfo;
  return (
    <S.EventCard onClick={() => navigate(`/event/${id}`)}>
      <S.ImageContainer>
        {images[0] ? ( // 썸네일 이미지 있으면 그거 쓰기
          <S.Image src={images[0]} alt={`${title}-img`} />
        ) : (
          <S.DefaultImageIcon />
        )}
      </S.ImageContainer>
      <S.Info>
        <S.Top>
          <S.IconTextWrapper>
            <S.IconText>
              <S.LocationIcon />
              <S.Text>{location}</S.Text>
            </S.IconText>
            <S.Seperater>|</S.Seperater>
            <S.IconText>
              <S.CoinIcon />
              <S.Text>{price === '0' ? '무료' : priceFormatter(price)}</S.Text>
            </S.IconText>
          </S.IconTextWrapper>
        </S.Top>
        <S.Title>{title}</S.Title>
        <S.Date>
          {formatDateToMonthDay(startDate)} ~ {formatDateToMonthDay(endDate)}
        </S.Date>
      </S.Info>
    </S.EventCard>
  );
};

export default EventCard;
