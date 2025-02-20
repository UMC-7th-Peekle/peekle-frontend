import { EventListWithFilter, DeferredLoader } from '@/components';
import { useMyLocationStore } from '@/stores';

const EventPage = () => {
  const { isMyLocationLoading } = useMyLocationStore();
  return (
    <>
      {isMyLocationLoading ? (
        <DeferredLoader text={'위치 정보를 가져오는 중이에요'} />
      ) : (
        <EventListWithFilter />
      )}
    </>
  );
};

export default EventPage;
