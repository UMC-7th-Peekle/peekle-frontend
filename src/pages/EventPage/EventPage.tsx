import * as S from './EventPage.styles';
import { EventCard } from '@/components';
import { events } from '@/sample-data/event';

export const EventPage = () => {
  return (
    <S.EventPageContainer>
      {events.map((event, index) => (
        <EventCard
          key={`${event.title} - ${index}`} // 일단 하드 코딩 해 놓음 나중엔 id 넘길 것임
          category={event.category}
          date={event.date}
          time={event.time}
          location={event.location}
          center={event.center}
          price={event.price}
          images={event.images}
          title={event.title}
          description={event.description}
          startDate={event.startDate}
          endDate={event.endDate}
        />
      ))}
    </S.EventPageContainer>
  );
};
