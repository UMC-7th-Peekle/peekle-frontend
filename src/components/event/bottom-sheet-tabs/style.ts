import styled from 'styled-components';
import resetSVG from '@/assets/images/icons/reset.svg?react';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  // Tabs 컨테이너가 남은 공간을 채우도록 함
  & > div:first-child {
    flex: 1;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  width: 412px;
  padding: 20px 16px;
  align-items: center;
  gap: 8px;
`;

export const ClearWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ClearIcon = styled(resetSVG)`
  width: 15.238px;
  height: 15.238px;
`;
