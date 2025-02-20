import { EventForm } from '@/components';
import { useId, useGetEventDetail } from '@/hooks';

const EventEditPage = () => {
  const id = useId();
  const { data: eventDetailData } = useGetEventDetail(Number(id));

  return (
    <EventForm mode="update" eventDetailData={eventDetailData.success?.event} />
  );
};

export default EventEditPage;
