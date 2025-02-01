import * as S from './style';
import { EventMap, MapHeader } from '@/components';

const EventMapPage = () => {
  return (
    <S.Container>
      <EventMap />
      <MapHeader />
    </S.Container>
  );
};

export default EventMapPage;
