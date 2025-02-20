// import { clientAuth } from '@/apis/client';
// import { useMutation } from '@tanstack/react-query';
// import { useHandleError } from '@/hooks';
// import {
//   DeleteEventResponseSchema,
//   DeleteEventResponse,
//   DeleteEventParams,
//   DeleteEventContext,
// } from '@/types/event';

// // API 호출 함수
// const deleteEvent = async (eventId: bigint): Promise<DeleteEventResponse> => {
//   const response = await clientAuth<DeleteEventResponse>({
//     url: `/events`,
//     data: { eventId: eventId.toString() },
//   });

//   // 응답 데이터 검증
//   const parsedData = DeleteEventResponseSchema.parse(response.data);
//   return parsedData;
// };

// const useDeleteEvent = () => {
//   const handleError = useHandleError();

//   const { mutateAsync: deleteEvent } = useMutation<
//     DeleteEventResponse,
//     Error,
//     DeleteEventParams
//   >({
//     mutationFn: (eventId: bigint) => deleteEvent(eventId),
//     onError: (error) => {
//       handleError(error);
//     },
//   });

//   return { deletedEvent };
// };

// export default useDeleteEvent;
