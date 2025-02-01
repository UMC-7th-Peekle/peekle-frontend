import styled from 'styled-components';
import XSVG from '@/assets/images/icons/X.svg?react';
import resetSVG from '@/assets/images/icons/reset.svg?react';
import { theme } from '@/styles/theme';
import mediaQuery from '@/styles/mediaQuery';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;

  // Tabs 컨테이너가 남은 공간을 채우도록 함
  & > div:first-child {
    flex: 1;
  }

  ${mediaQuery.sMobile`
    gap: 0;
  `}
`;

export const Header = styled.header`
  display: flex;
  position: relative;
  padding: 24px 24px 12px 24px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  text-align: center;

  ${mediaQuery.sMobile`
    padding: 12px 12px 6px 12px;
  `}
`;

export const Title = styled.h2`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['18SB']};

  ${mediaQuery.sMobile`
    ${theme.typeFace.body['16SB']};
  `}
`;

export const XIcon = styled(XSVG)`
  position: absolute;
  right: 20px;
  width: 20px;
  height: 20px;

  ${mediaQuery.sMobile`
    width: 15px;
    height: 15px;
  `}
`;

export const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 16px;
  align-items: center;
  gap: 8px;
  position: fixed;
  bottom: 0;
  background-color: ${theme.color.gray[0]};
  z-index: 101; // 캘린더보다 위에

  ${mediaQuery.sMobile`
    padding: 10px 8px;
  `}
`;

export const ClearWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ClearIcon = styled(resetSVG)`
  width: 20px;
  height: 20px;
`;
