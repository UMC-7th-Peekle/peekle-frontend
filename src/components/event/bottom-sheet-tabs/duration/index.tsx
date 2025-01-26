import * as S from './style';
import { useEffect, useState } from 'react';
import { DURATION_OPTIONS, PREDEFINED_RANGES } from '@/constants/event';
import { Chip, DateList } from '@/components';
import { DateRange } from '@/types/event';
import {
  formatDate,
  formatDateWithDayOfWeek,
  isInRange,
  isSameDay,
} from '@/utils';
import { useEventFilter } from '@/hooks';

const today = new Date();

const getDateRangeFromStoredValue = (storedValue: string) => {
  if (storedValue && storedValue !== 'all' && !storedValue.endsWith('DD')) {
    const [start, end] = storedValue
      .split(',')
      .map((date: string) => new Date(date));
    return [start, end];
  }
  if (storedValue.endsWith('DD')) {
    return [today, null];
  }
  return [today, new Date(new Date().setFullYear(2999))];
};

const Duration = () => {
  const { storedValue, handleSelect } = useEventFilter({
    key: 'duration',
    type: 'single',
  });

  const [selectedChip, setSelectedChip] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const range = getDateRangeFromStoredValue(storedValue);
    return [range[0] ?? null, range[1] ?? null] as DateRange;
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const decodedValue = storedValue.replace('%2C', ',');
    const [storedStart, storedEnd] = decodedValue.split(',');

    if (storedValue === 'all') {
      setSelectedChip('all');
    } else if (storedValue.endsWith('DD')) {
      setSelectedChip('custom');
    } else {
      let matched = false;
      for (const [key, value] of Object.entries(PREDEFINED_RANGES)) {
        const [predefinedStart, predefinedEnd] = value;
        if (
          formatDate(new Date(storedStart)) === formatDate(predefinedStart) &&
          formatDate(new Date(storedEnd)) === formatDate(predefinedEnd)
        ) {
          setSelectedChip(key);
          matched = true;
          break;
        }
      }
      if (!matched) {
        setSelectedChip('custom');
      }
    }
  }, [storedValue, dateRange]);

  // ui 표시용 YYYY-MM-DD (요일) 형식
  const startDateWithDayOfWeek = dateRange[0]
    ? formatDateWithDayOfWeek(dateRange[0])
    : formatDateWithDayOfWeek(today);
  const endDateWithDayOfWeek = dateRange[1]
    ? formatDateWithDayOfWeek(dateRange[1])
    : formatDateWithDayOfWeek(new Date(new Date().setFullYear(2999)));

  // 날짜 범위와 Chip 상태 매칭
  const getMatchingChip = (dateRange: DateRange) => {
    const [start, end] = dateRange;

    if (selectedChip === 'all') return 'all';

    if (!start || !end || selectedChip === 'custom') return 'custom';

    for (const [, value] of DURATION_OPTIONS) {
      if (value === 'custom') continue;

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
    setSelectedChip(value);
    setIsCalendarOpen(false);

    if (value === 'all') {
      handleSelect('all');
      const endDate = new Date(today); // 복제
      endDate.setFullYear(2999);
      setDateRange([today, endDate]);
      return;
    }

    if (value === 'custom') {
      handleSelect(`${formatDate(today)}, YYYY-MM-DD`);
      setDateRange([today, null]);
      return;
    }

    const range = PREDEFINED_RANGES[value as keyof typeof PREDEFINED_RANGES];
    const [predefinedStart, predefinedEnd] = range;
    setDateRange([predefinedStart, predefinedEnd]);
    const dateString = `${formatDate(predefinedStart)},${formatDate(predefinedEnd)}`;
    handleSelect(dateString);
  };

  // 캘린더 날짜 선택
  const handleCalendarChange = (value: Date) => {
    if (!dateRange[0]) {
      // 첫 번째 날짜가 선택되지 않았다면 첫 번째 날짜로 설정
      setDateRange([value, null]);
    } else if (!dateRange[1]) {
      // 두 번째 날짜가 없다면 두 번째 날짜로 설정
      const start = dateRange[0];
      const end = value;
      if (start > end) {
        setDateRange([end, start]);
        const dateString = `${formatDate(end)},${formatDate(start)}`;
        handleSelect(dateString);
      } else {
        setDateRange([start, end]);
        const dateString = `${formatDate(start)},${formatDate(end)}`;
        handleSelect(dateString);
      }
    } else {
      // 두 날짜가 모두 선택되었으면, 첫 번째 날짜와 두 번째 날짜를 다시 설정
      setDateRange([value, null]);
    }
  };

  // 날짜 포맷 변경(숫자만) - 캘린더에 일만 표시하기 위해
  const formatCalendarDay = (_locale: string | undefined, utcDate: Date) => {
    const day = utcDate.getDate();
    return day < 10 ? `0${day}` : `${day}`;
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
          {selectedChip === 'custom' ? (
            <>
              <DateList
                isFocus={isCalendarOpen && !dateRange[1]}
                date={startDateWithDayOfWeek}
              />
              {dateRange[1] ? (
                <DateList
                  isFocus={!!dateRange[1]}
                  date={endDateWithDayOfWeek}
                  onClick={() => setIsCalendarOpen(true)}
                />
              ) : (
                <DateList.Plus
                  isFocus={!isCalendarOpen}
                  onClick={() => setIsCalendarOpen(true)}
                />
              )}
            </>
          ) : (
            <>
              <DateList date={startDateWithDayOfWeek} />
              <DateList date={endDateWithDayOfWeek} />
            </>
          )}
        </S.DateBtnContainer>
      </S.TopContainer>
      {isCalendarOpen && (
        <S.StyledCalendar
          rangeHeight="66%"
          isOnly={
            !dateRange[0] ||
            (dateRange[0] && !dateRange[1]) ||
            isSameDay(dateRange[0], dateRange[1])
          }
          onChange={(value) => handleCalendarChange(value as Date)}
          value={dateRange}
          locale="ko-KR"
          view="month"
          formatDay={formatCalendarDay}
          // showNeighboringMonth={false} /* 이전 달 다음 달 보이지 않게 */
          calendarType="gregory" /* 일요일부터 시작 */
          prevLabel={<S.StyledArrowLeft />}
          nextLabel={<S.StyledArrowRight />}
          prev2Label={null} /* 년 단위 이동 없앰 */
          next2Label={null} /* 년 단위 이동 없앰 */
          tileClassName={({ date }) => {
            const isStart = isSameDay(date, dateRange[0]);
            const isEnd = isSameDay(date, dateRange[1]);
            const inRange =
              dateRange[0] &&
              dateRange[1] &&
              isInRange(date, dateRange[0], dateRange[1]);
            const isToday = isSameDay(date, today);

            if (isStart) return 'selectedDay startDay';
            if (isEnd) return 'selectedDay endDay';
            if (inRange) return isToday ? 'in-range' : 'in-range';
            if (isToday) return 'today';
            return '';
          }}
        />
      )}
    </S.Container>
  );
};

export default Duration;
