import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
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
  ${({ theme }) => theme.typeFace.body['18SB']};
`;

export const DateBtnContainer = styled.div`
  display: flex;
  gap: 8px;
`;

//calendar
export const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-height: 300px;
  font-family: 'Pretendard', sans-serif;
  border: none;

  /* 네비게이션 */
  .react-calendar__navigation {
    span {
      ${({ theme }) => theme.typeFace.body['18SB']};
      color: ${({ theme }) => theme.color.gray[900]};
    }
  }
  .react-calendar__navigation button:enabled:hover {
    background: ${({ theme }) => theme.color.gray[0]};
  }
  .react-calendar__navigation button:enabled:focus {
    background: ${({ theme }) => theme.color.gray[0]};
  }

  .react-calendar__navigation__arrow {
    ${({ theme }) => theme.typeFace.body['18R']};
    color: ${({ theme }) => theme.color.gray[500]};
  }

  /* 월 뷰 */
  .react-calendar__month-view {
    margin-top: 12px;
    abbr {
      /* 텍스트 */
      ${({ theme }) => theme.typeFace.body['18R']};
      color: ${({ theme }) => theme.color.gray[600]};
    }
  }

  /* 주 뷰 */
  .react-calendar__month-view__weekdays {
    height: 48px;
    abbr {
      ${({ theme }) => theme.typeFace.body['16R']};
      color: ${({ theme }) => theme.color.gray[400]};
      text-decoration: none;
    }
    // 주말은 색 다르게 하는 게 좋을 것 같아서 임의로 넣음
    .react-calendar__month-view__weekdays__weekday--weekend {
      abbr {
        color: ${({ theme }) => theme.color.gray[900]};
        /* color: ${({ theme }) => theme.color.sementic.red}; */
      }
    }
  }

  /* 일 뷰 */
  .react-calendar__tile {
    &.selected:not(.react-calendar__tile--rangeStart):not(
        .react-calendar__tile--rangeEnd
      ) {
      background: ${({ theme }) => theme.color.primary[500]};
      color: ${({ theme }) => theme.color.gray[0]};
      border-radius: ${({ theme }) => theme.borderRadius.md};
    }
  }

  // 주말은 색 다르게 하는 게 좋을 것 같아서 임의로 넣음
  .react-calendar__month-view__days__day--weekend {
    abbr {
      color: ${({ theme }) => theme.color.gray[900]};
      /* color: ${({ theme }) => theme.color.sementic.red}; */
    }
  }
  // 이전, 다음달 날짜 색 다르게 하기
  .react-calendar__month-view__days__day--neighboringMonth {
    abbr {
      color: ${({ theme }) => theme.color.gray[200]};
    }
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile--now:enabled:hover {
    background: ${({ theme }) => theme.color.gray[0]};

    &.react-calendar__tile--range {
      background: ${({ theme }) => theme.color.primary[100]};
    }
  }

  .react-calendar__tile--now {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 2px solid ${({ theme }) => theme.color.primary[500]};
    background: ${({ theme }) => theme.color.gray[0]};
    abbr {
      color: ${({ theme }) => theme.color.primary[500]};
      ${({ theme }) => theme.typeFace.body['18SB']};
    }
    /* background: ${({ theme }) => theme.color.gray[0]};
    abbr {
      padding: 8.5px 10px;
      color: ${({ theme }) => theme.color.primary[500]};
      ${({ theme }) => theme.typeFace.body['18SB']};
      border-radius: ${({ theme }) => theme.borderRadius.xxlg};
      border: 2px solid ${({ theme }) => theme.color.primary[500]};
    } */
  }

  .react-calendar__tile--range {
    border-radius: 0;
    background: ${({ theme }) => theme.color.primary[100]};

    &.react-calendar__tile--now {
      background: ${({ theme }) => theme.color.primary[100]};
      border: none;
      abbr {
        background: ${({ theme }) => theme.color.primary[100]};
        color: ${({ theme }) => theme.color.primary[500]};
        ${({ theme }) => theme.typeFace.body['18SB']};
      }
    }
  }

  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md};
    /* border-radius: ${({ theme }) => theme.borderRadius.xxlg}; */
    background: ${({ theme }) => theme.color.primary[500]} !important;
    abbr {
      ${({ theme }) => theme.typeFace.body['18SB']};
      color: ${({ theme }) => theme.color.gray[0]};
    }

    &.react-calendar__tile--now {
      abbr {
        border: none;
        background: ${({ theme }) => theme.color.primary[500]};
        color: ${({ theme }) => theme.color.gray[0]};
      }
    }
  }

  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md};
    /* border-radius: ${({ theme }) => theme.borderRadius.xxlg}; */
    background: ${({ theme }) => theme.color.primary[500]} !important;
    abbr {
      ${({ theme }) => theme.typeFace.body['18SB']};
      color: ${({ theme }) => theme.color.gray[0]};
    }

    &.react-calendar__tile--now {
      border: none;
      abbr {
        background: ${({ theme }) => theme.color.primary[500]};
        color: ${({ theme }) => theme.color.gray[0]};
      }
    }

    /* range start === range end 일 때 */
    &.react-calendar__tile--rangeStart {
      border-radius: ${({ theme }) => theme.borderRadius.md};
      background: red;
    }
  }
`;
