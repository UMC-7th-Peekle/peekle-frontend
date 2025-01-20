import * as S from './style';
import { EventData } from '@/types/event';
import { formatDateToMonthDay } from '@/utils/dateFormatter';

export const EventCard = (props: EventData) => {
  const { location, price, images, title, startDate, endDate } = props;

  return (
    <S.EventCard>
      <S.ImageContainer className="image-container">
        {images.length > 0 ? (
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
              <S.Text>{price}</S.Text>
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
