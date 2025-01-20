import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ArrowLeft from '@/assets/images/icons/arrow-left.svg?react';
import ArrowRight from '@/assets/images/icons/arrow-right.svg?react';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export const TopContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 -20px;
  padding: 0 16px;
`;

export const ChipContainer = styled.div`
  display: flex;
  gap: 8px;
  ${theme.typeFace.body['18SB']};
`;

export const DateBtnContainer = styled.div`
  display: flex;
  gap: 8px;
`;

//calendar
export const StyledCalendar = styled(Calendar)<{
  rangeHeight?: string;
  isOnly: boolean;
}>`
  width: 100%;
  max-width: 412px;
  height: 351px;
  font-family: 'Pretendard', sans-serif;
  border: none;

  /* 네비게이션 */
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
      background-color: ${theme.color.gray['0']};
      pointer-events: none;
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
    background-color: ${theme.color.gray['0']};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    abbr {
      ${theme.typeFace.body['18R']};
      color: ${theme.color.gray['600']};
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
    width: ${({ rangeHeight }) => rangeHeight || '65%'};
    height: ${({ rangeHeight }) => rangeHeight || '65%'};
    border-radius: ${theme.borderRadius.xxlg};
    background-color: ${theme.color.gray['0']};
    border: 2px solid ${theme.color.primary['500']};
    z-index: 1;
  }
  .today {
    color: ${theme.color.primary['500']};
  }

  /* 범위 내 날짜 스타일 */
  .react-calendar__tile.in-range::before {
    content: '';
    position: absolute;
    width: 120%;
    left: -10%;
    height: ${({ rangeHeight }) => rangeHeight || '65%'};
    background-color: ${theme.color.primary['100']};
    z-index: 0;
    border-color: ${theme.color.primary['100']};
  }

  /* startDay, endDay 스타일 */
  .react-calendar__tile.startDay::before,
  .react-calendar__tile.endDay::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ rangeHeight }) => rangeHeight || '65%'};
    height: ${({ rangeHeight }) => rangeHeight || '65%'};
    border-radius: 50%;
    background-color: ${theme.color.primary['500']};
    z-index: 50;
  }

  .react-calendar__tile.startDay::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    width: 50%;
    height: ${({ rangeHeight }) => rangeHeight || '65%'};
    background-color: ${theme.color.primary['100']};
    z-index: 10;
    display: ${({ isOnly }) => (isOnly ? 'none' : 'block')};
  }

  .react-calendar__tile.endDay::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(-50%);
    width: 50%;
    height: ${({ rangeHeight }) => rangeHeight || '65%'};
    background-color: ${theme.color.primary['100']};
    z-index: 10;
    display: ${({ isOnly }) => (isOnly ? 'none' : 'block')};
  }

  .selectedDay {
    color: ${theme.color.gray['0']};
    ${theme.typeFace.body['18SB']};
  }

  /* 월 뷰 */
  .react-calendar__month-view {
  }

  /* 주 뷰 */
  .react-calendar__month-view__weekdays__weekday {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
    abbr {
      ${theme.typeFace.body['16R']};
      color: ${theme.color.gray[400]};
      text-decoration: none;
    }
    // 주말은 색 다르게 하는 게 좋을 것 같아서 임의로 넣음
    .react-calendar__month-view__weekdays__weekday--weekend {
      abbr {
        color: ${theme.color.gray[900]};
      }
    }
  }
  // 주말은 색 다르게
  .react-calendar__month-view__days__day--weekend {
    abbr {
      color: ${theme.color.gray[900]};
    }
  }
  // 이전, 다음달 날짜 색 다르게 하기
  .react-calendar__month-view__days__day--neighboringMonth {
    abbr {
      color: ${theme.color.gray[200]};
    }
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${({ theme }) => theme.color.gray[0]};
  }
`;

/* 화살표 아이콘 스타일 */
export const StyledArrowLeft = styled(ArrowLeft)`
  width: 18px;
  height: 18px;
  ${theme.color.gray['500']};
`;

export const StyledArrowRight = styled(ArrowRight)`
  width: 18px;
  height: 18px;
  ${theme.color.gray['500']};
`;
