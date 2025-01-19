import * as S from './style';
import { EventList } from '@/components';

const EventSearchPage = () => {
  return (
    <S.Container>
      <p>검색 페이지</p>
      <EventList />
    </S.Container>
  );
};

export default EventSearchPage;
