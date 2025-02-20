import { useSuspenseQuery } from '@tanstack/react-query';
import { client, clientAuth } from '@/apis/client';
import {
  // EventDetailResponseSchema,
  EventDetailResponse,
  EventDetailQkType,
} from '@/types/event';
import { GET_EVENT_DETAIL_QK } from '@/constants/event';
import queryClient from '@/lib/tanstack-query/queryClient';

// api 호출 함수
const getEvents = async (eventId: number): Promise<EventDetailResponse> => {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  let response;
  if (isLoggedIn) {
    response = await clientAuth<EventDetailResponse>({
      method: 'GET',
      url: `/events/${eventId}`,
    });
  } else {
    response = await client<EventDetailResponse>({
      method: 'GET',
      url: `/events/${eventId}`,
    });
  }

  // const parsedData = EventDetailResponseSchema.parse(response.data);
  // return parsedData;
  return response.data;
};

const useGetEventDetail = (eventId: number) => {
  const { data } = useSuspenseQuery<
    EventDetailResponse,
    Error,
    EventDetailResponse,
    EventDetailQkType
  >({
    queryKey: [GET_EVENT_DETAIL_QK, eventId.toString()],
    queryFn: () => getEvents(eventId),
    initialData: () => queryClient.getQueryData([GET_EVENT_DETAIL_QK, eventId]),
  });

  return { data };
};

export default useGetEventDetail;
