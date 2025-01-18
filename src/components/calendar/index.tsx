import { useState } from 'react';
import { StyledCalendar } from './style';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());

  const startDay = new Date(2025, 0, 7); // 2025년 2월 7일
  const endDay = new Date(2025, 0, 10); // 2025년 2월 10일
  const today = new Date();

  // 날짜 비교 함수
  const isSameDay = (date1: Date, date2: Date) =>
    date1.toDateString() === date2.toDateString();

  const isInRange = (date: Date) =>
    date.getTime() > startDay.getTime() && date.getTime() < endDay.getTime();

  return (
    <div>
      <StyledCalendar
        rangeHeight="66%" // 선택된 날짜 원, 범위 높이 조정
        onChange={onChange}
        value={value}
        formatDay={(_, date) => `${date.getDate()}`}
        tileClassName={({ date }) => {
          if (isSameDay(date, today)) return 'today';
          if (isSameDay(date, startDay)) return 'selectedDay startDay';
          if (isSameDay(date, endDay)) return 'selectedDay endDay';
          if (isInRange(date)) return 'in-range';
          return '';
        }}
      />
    </div>
  );
}
