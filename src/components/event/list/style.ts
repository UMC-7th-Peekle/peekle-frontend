import styled from 'styled-components';
import WarningSVG from '@/assets/images/icons/warning.svg?react';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyContainer = styled.div`
  margin: 96px auto 0;
  text-align: center;
  display: flex;
  width: 150px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const WarningIcon = styled(WarningSVG)`
  width: 56px;
  height: 56px;
  color: ${theme.color.gray[200]};
`;

export const EmptyText = styled.p`
  ${theme.typeFace.body['18R']}
  color: ${theme.color.gray[400]};
`;
