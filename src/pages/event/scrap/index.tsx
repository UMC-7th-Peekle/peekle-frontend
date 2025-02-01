import * as S from './style';
import { Backward, CategoryChips, EventList } from '@/components';

const EventScrapPage = () => {
  return (
    <S.EventScrapContainer>
      <S.Header>
        <Backward />
        <S.Title>찜한 이벤트</S.Title>
      </S.Header>
      <S.CategoryFilterWrapper>
        <CategoryChips />
      </S.CategoryFilterWrapper>
      <EventList page={'scrap'} />
    </S.EventScrapContainer>
  );
};

export default EventScrapPage;
