import mediaQuery from '@/styles/mediaQuery';
import styled from 'styled-components';

export const TabsContainer = styled.section`
  ${mediaQuery.sMobile`
    gap: 15px;
  `}
`;

export const ListContainer = styled.header`
  width: 100vw;
  display: flex;
  gap: 16px;
  // 전체 너비 채우기
  margin-left: -16px;
  padding-left: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[50]};
`;

export const PanelContainer = styled.section`
  width: 100%;
  padding: 20px 0 120px; // 버튼 높이 제외
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;

  ${mediaQuery.sMobile`
    padding-bottom: 100px;
  `}
`;

export const TriggerBtn = styled.button<{ $isActive: boolean }>`
  ${({ $isActive, theme }) =>
    $isActive ? theme.typeFace.body['18SB'] : theme.typeFace.body['18R']};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.gray[900] : theme.color.gray[400]};
  padding: 8px 4px;
  border-bottom: 3px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.color.gray[900] : 'transparent'};
`;
