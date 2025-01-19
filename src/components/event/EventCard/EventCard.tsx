import * as S from './EventCard.styles';
import { EventCardProps } from '@/types/event';
import { formatDateToMonthDay, priceFormatter } from '@/utils';
import { events } from '@/sample-data/event';
import { EventData } from '@/types/event';

export const EventCard = ({ id }: EventCardProps) => {
  const eventInfo = events.find((event: EventData) => event.id === id);
  if (!eventInfo) return;

  const { images, title, startDate, endDate, location, price } = eventInfo;
  return (
    <S.EventCard>
      <S.ImageContainer className="image-container">
        {images[0] ? (
          <S.Image src={images[0]} alt={`${title}-img`} />
        ) : (
          <S.EmptyImageContainer>
            <S.DefaultImageIcon />
          </S.EmptyImageContainer>
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
