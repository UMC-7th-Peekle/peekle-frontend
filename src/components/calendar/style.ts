import styled from 'styled-components';
import Calendar from 'react-calendar';
import ArrowLeft from '@/assets/images/icons/arrow-left.svg?react';
import ArrowRight from '@/assets/images/icons/arrow-right.svg?react';

export const StyledCalendar = styled(Calendar)<{
  rangeHeight?: string;
  isOnly: boolean;
}>`
  border: none;
  width: 100%;
  max-width: 412px;
  height: 351px;

  @media (min-width: 412px) {
    width: 412px;
  }

  /* 네비게이션 스타일 */
  .react-calendar__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;

    /* 년/월 텍스트 중앙 정렬 */
    .react-calendar__navigation__label {
      flex: 1;
      text-align: center;
      font-size: 1.125rem; /* 18px */
      font-weight: 600;
      background-color: ${(props) => props.theme.color.gray['0']};
      pointer-events: none;
    }

    /* 년도 넘기는 버튼 숨기기 */
    .react-calendar__navigation__next2-button,
    .react-calendar__navigation__prev2-button {
      display: none;
    }

    /* 달 넘기는 버튼 스타일 */
    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    /* 왼쪽 화살표 버튼 */
    .react-calendar__navigation__prev-button {
      &::before {
        content: '';
      }
    }

    /* 오른쪽 화살표 버튼 */
    .react-calendar__navigation__next-button {
      &::before {
        content: '';
      }
    }
  }

  /* 타일 스타일 */
  .react-calendar__tile {
    aspect-ratio: 1;
    background-color: white;
    color: ${(props) => props.theme.color.gray['600']};
    font-size: 1.125rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    abbr {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
    }
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile.today::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => props.rangeHeight || '65%'};
    height: ${(props) => props.rangeHeight || '65%'};
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.gray['0']};
    border: 2px solid ${(props) => props.theme.color.primary['500']};
    z-index: 1;
  }
  .today {
    color: ${(props) => props.theme.color.primary['500']};
    font-weight: 600;
  }

  /* 범위 내 날짜 스타일 */
  .react-calendar__tile.in-range::before {
    content: '';
    position: absolute;
    width: 120%;
    left: -10%;
    height: ${(props) => props.rangeHeight || '65%'};
    background-color: ${(props) => props.theme.color.primary['100']};
    z-index: 0;
    border-color: ${(props) => props.theme.color.primary['100']};
  }

  /* startDay, endDay 스타일 */
  .react-calendar__tile.startDay::before,
  .react-calendar__tile.endDay::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => props.rangeHeight || '65%'};
    height: ${(props) => props.rangeHeight || '65%'};
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.primary['500']};
    z-index: 50;
  }

  .react-calendar__tile.startDay::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    width: 50%;
    height: ${(props) => props.rangeHeight || '65%'};
    background-color: ${(props) => props.theme.color.primary['100']};
    z-index: 10;
    display: ${(props) => (props.isOnly ? 'none' : 'block')};
  }

  .react-calendar__tile.endDay::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(-50%);
    width: 50%;
    height: ${(props) => props.rangeHeight || '65%'};
    background-color: ${(props) => props.theme.color.primary['100']};
    z-index: 10;
  }

  .selectedDay {
    color: ${(props) => props.theme.color.gray['0']};
    font-weight: 600;
  }

  /* 다른 달의 날짜 숨기기 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: white;
  }

  /* 요일 스타일 밑줄 제거 */
  .react-calendar__month-view__weekdays__weekday {
    text-decoration: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-weight: 400;
    text-align: center;
    font-size: 1rem;
    color: ${(props) => props.theme.color.gray['400']};
    abbr {
      text-decoration: none;
    }
  }
`;

/* 화살표 아이콘 스타일 */
export const StyledArrowLeft = styled(ArrowLeft)`
  width: 18px;
  height: 18px;
  path {
    stroke: ${(props) => props.theme.color.gray['500']};
  }
  &:hover path {
    stroke: ${(props) => props.theme.color.gray['600']};
  }
`;

export const StyledArrowRight = styled(ArrowRight)`
  width: 18px;
  height: 18px;
  path {
    stroke: ${(props) => props.theme.color.gray['500']};
  }
  &:hover path {
    stroke: ${(props) => props.theme.color.gray['600']};
  }
`;
