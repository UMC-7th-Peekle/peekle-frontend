import * as S from './Duration.styles';
import { useState } from 'react';
import { DURATION_OPTIONS, PREDEFINED_RANGES } from '@/constants/event';
import { Chip } from '@/components';
import { DateRange } from '@/types/event';
import { formatDate, formatDateWithDayOfWeek } from '@/utils';
import useEventFilter from '@/hooks/event/useEventFilter';

const Duration = () => {
  const { storedValue, setStoredValue, handleSelect } = useEventFilter({
    key: 'duration',
    type: 'single',
  });

  const [dateRange, setDateRange] = useState<DateRange>(() => {
    if (storedValue && storedValue !== 'all') {
      const [start, end] = storedValue.split(',').map((date) => new Date(date));
      return [start, end];
    }
    return [new Date(), null]; // 초기값
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 스타일용
  // ui 표시용 YYYY-MM-DD (요일) 형식
  const startDateWithDayOfWeek = dateRange[0]
    ? formatDateWithDayOfWeek(dateRange[0])
    : 'YYYY-MM-DD';
  const endDateWithDayOfWeek = dateRange[1]
    ? formatDateWithDayOfWeek(dateRange[1])
    : 'YYYY-MM-DD';

  // 날짜 범위와 Chip 상태 매칭
  const getMatchingChip = (dateRange: DateRange) => {
    const [start, end] = dateRange;
    // 날짜가 없으면 'all' 반환
    if (!start || !end) {
      return 'all';
    }

    for (const [, value] of DURATION_OPTIONS) {
      if (value === 'all') continue;

      const [predefinedStart, predefinedEnd] =
        PREDEFINED_RANGES[value as keyof typeof PREDEFINED_RANGES];

      if (
        formatDate(start) === formatDate(predefinedStart) &&
        formatDate(end) === formatDate(predefinedEnd)
      ) {
        return value;
      }
    }
    // 매칭되는 기간이 없으면 어떤 Chip도 active X
    return 'null';
  };

  // Chip 클릭
  const handleChipSelect = (value: string) => {
    if (value === 'all') {
      handleSelect('all');
      setDateRange([new Date(), null]);
      setIsCalendarOpen(false);
      return;
    }

    setIsCalendarOpen(true);
    const range = PREDEFINED_RANGES[value as keyof typeof PREDEFINED_RANGES];
    const [predefinedStart, predefinedEnd] = range;
    setDateRange([predefinedStart, predefinedEnd]);
    const dateString = `${formatDate(predefinedStart)},${formatDate(predefinedEnd)}`;
    setStoredValue(dateString);
    handleSelect(dateString);
    setStoredValue(
      `${formatDate(predefinedStart)},${formatDate(predefinedEnd)}`,
    );
  };

  // 캘린더 날짜 선택
  const handleCalendarChange = (value: Date) => {
    if (!dateRange[0] || dateRange[1]) {
      setDateRange([value, null]);
    } else {
      const [start] = dateRange;
      const end = value;

      if (start > end) {
        setDateRange([end, start]);
        const dateString = `${formatDate(end)},${formatDate(start)}`;
        setStoredValue(dateString);
        handleSelect(dateString);
      } else {
        setDateRange([start, end]);
        const dateString = `${formatDate(start)},${formatDate(end)}`;
        setStoredValue(dateString);
        handleSelect(dateString);
      }
    }
  };

  // 날짜 포맷 변경(숫자만) - 캘린더에 일만 표시하기 위해
  const formatCalendarDay = (_locale: string | undefined, utcDate: Date) => {
    const day = utcDate.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  };

  // 처음 선택한 날짜 색 바꾸는 용도
  const handleDayClick = (value: Date) => {
    setSelectedDate(value);
    setDateRange([value, null]);
  };

  const getTileClassName = ({ date }: { date: Date }) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      return 'selected';
    }
    return '';
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.ChipContainer>
          {DURATION_OPTIONS.map(([label, value]) => (
            <Chip
              key={value}
              label={label}
              value={value}
              selectedValue={getMatchingChip(dateRange)}
              onSelect={() => handleChipSelect(value)}
            />
          ))}
        </S.ChipContainer>
        <S.DateBtnContainer>
          <span>{startDateWithDayOfWeek}</span>
          {storedValue === 'all' ? (
            isCalendarOpen ? (
              <span>{endDateWithDayOfWeek} </span>
            ) : (
              <button onClick={() => setIsCalendarOpen(true)}>
                {'기간 추가'}
              </button>
            )
          ) : (
            <span>{endDateWithDayOfWeek}</span>
          )}
        </S.DateBtnContainer>
      </S.TopContainer>
      {isCalendarOpen && (
        <S.StyledCalendar
          onChange={(value) => handleCalendarChange(value as Date)}
          value={dateRange}
          onClickDay={handleDayClick}
          tileClassName={getTileClassName}
          locale="ko-KR"
          view="month"
          formatDay={formatCalendarDay}
          // showNeighboringMonth={false} /* 이전 달 다음 달 보이지 않게 */
          calendarType="gregory" /* 일요일부터 시작 */
          prev2Label={null} /* 년 단위 이동 없앰 */
          next2Label={null} /* 년 단위 이동 없앰 */
        />
      )}
    </S.Container>
  );
};

export default Duration;
