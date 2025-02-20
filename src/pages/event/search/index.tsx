import * as S from './style';
import { SearchHeader, EventMapContainer, DeferredLoader } from '@/components';
import { useMyLocationStore } from '@/stores';

const EventSearchPage = () => {
  const { isMyLocationLoading } = useMyLocationStore();
  return (
    <>
      {isMyLocationLoading ? (
        <DeferredLoader text={'위치 정보를 가져오는 중이에요'} />
      ) : (
        <S.Container>
          <SearchHeader />
          <EventMapContainer isSearchPage={true} />
        </S.Container>
      )}
    </>
  );
};

export default EventSearchPage;
