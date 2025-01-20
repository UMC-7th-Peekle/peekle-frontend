import styled from 'styled-components';

export const TabsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

export const ListContainer = styled.header`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[50]};
  padding: 0 20px; // 탭 아래 회색 줄때문에 패딩 분리함
`;

export const PanelContainer = styled.section`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
`;

export const TriggerBtn = styled.button<{ $isActive: boolean }>`
  ${({ $isActive, theme }) =>
    $isActive ? theme.typeFace.body['18SB'] : theme.typeFace.body['18R']};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.gray[900] : theme.color.gray[400]};
  padding: 8px 4px;
  border-bottom: 4px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.color.primary[500] : 'transparent'};
`;
