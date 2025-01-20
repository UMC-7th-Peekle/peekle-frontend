import { StyledCalendar, StyledArrowLeft, StyledArrowRight } from './style';
import { isSameDay, isInRange } from '@/utils';
import { useState } from 'react';
import { useDateStore } from './store';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar() {
  const { startDay, endDay, setStartDay, setEndDay, resetDays } =
    useDateStore();
  const [value, setValue] = useState<Value>(null);
  const today = new Date();

  // 타일 클릭 핸들러
  const handleTileClick = (date: Date) => {
    if (!startDay || (startDay && endDay)) {
      setStartDay(date);
      setEndDay(null);
    } else if (!endDay) {
      setEndDay(date);
    }
  };
  return (
    <div>
      <StyledCalendar
        rangeHeight="66%"
        onChange={setValue}
        value={value}
        formatDay={(_, date) => `${date.getDate()}`}
        isOnly={!startDay || (startDay && !endDay)}
        prevLabel={<StyledArrowLeft />}
        nextLabel={<StyledArrowRight />}
        onClickDay={handleTileClick}
        tileClassName={({ date }) => {
          const isStart = isSameDay(date, startDay);
          const isEnd = isSameDay(date, endDay);
          const inRange =
            startDay && endDay && isInRange(date, startDay, endDay);
          const isToday = isSameDay(date, today);

          if (isStart) return 'selectedDay startDay';
          if (isEnd) return 'selectedDay endDay';
          if (inRange) return isToday ? 'in-range' : 'in-range';
          if (isToday) return 'today';
          return '';
        }}
      />
      <button onClick={resetDays}>Reset Dates</button>
    </div>
  );
}
