import * as S from './style';
import { EventCard } from '@/components';
import { useGetEventScrap, useInfiniteScroll, useEventFilter } from '@/hooks';
import { EventDataFromScrap } from '@/types/event';

const EventScrapList = () => {
  const { formattedFilters } = useEventFilter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetEventScrap({
      categories: formattedFilters.categories,
    });

  const { lastElementRef } = useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const events = data.pages.flatMap((page) => page.success?.events ?? []) ?? [];

  console.log(events);
  return (
    <>
      {events.length > 0 ? (
        <S.EventsContainer>
          {events.map((event: EventDataFromScrap, index, events) => (
            <EventCard
              key={event.eventId}
              id={event.eventId}
              eventCardData={{
                eventImages: event.event.eventImages,
                title: event.event.title,
                price: event.event.price,
              }}
              ref={index === events.length - 1 ? lastElementRef : null}
            />
          ))}
        </S.EventsContainer>
      ) : (
        <S.EmptyContainer>
          <S.NoLikeResult />
        </S.EmptyContainer>
      )}
    </>
  );
};

export default EventScrapList;
