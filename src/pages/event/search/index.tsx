import * as S from './style';
import { SearchHeader, EventMapContainer } from '@/components';

const EventSearchPage = () => {
  return (
    <S.Container>
      <SearchHeader />
      <EventMapContainer isSearchPage={true} />
    </S.Container>
  );
};

export default EventSearchPage;
