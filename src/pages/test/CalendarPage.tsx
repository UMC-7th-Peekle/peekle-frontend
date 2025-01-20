import { Calendar } from '@/components';
import { useDateRange } from '@/components/common/calendar/store';
import { DateList } from '@/components/common/date-list';
import styled from 'styled-components';

// Calendar + DateList 컴포넌트를 사용하는 예시입니다.

const DateListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
`;

export default function CalendarPage() {
  const { startDay, endDay } = useDateRange();

  return (
    <section>
      <DateListContainer>
        {startDay ? (
          <DateList date={startDay} isFocus={!startDay} />
        ) : (
          <DateList.Plus isFocus={!startDay} />
        )}
        {endDay ? (
          <DateList date={endDay} isFocus={true} />
        ) : (
          <DateList.Plus date={endDay} isFocus={!!startDay} />
        )}
      </DateListContainer>
      <Calendar />
    </section>
  );
}
