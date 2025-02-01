import * as S from './style';
import { EventMap, MapHeader } from '@/components';

const EventMapPage = () => {
  return (
    <S.Container>
      <MapHeader />
      <EventMap />
    </S.Container>
  );
};

export default EventMapPage;
