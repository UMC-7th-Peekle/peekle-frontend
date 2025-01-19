import * as S from './style';
import { EventList } from '@/components';

const EventScrapPage = () => {
  return (
    <S.Container>
      <p>이벤트 스크랩 페이지</p>
      <EventList />
    </S.Container>
  );
};

export default EventScrapPage;
