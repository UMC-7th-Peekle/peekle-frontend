import styled from 'styled-components';
import Map from '@/assets/images/icons/map.svg?react';

export const SearchBarWrapper = styled.div`
  margin: 0 -16px;
  width: 100vw;
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 12px;
`;

export const MapIcon = styled(Map)`
  width: 28px;
  height: 28px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover path {
    stroke: ${({ theme }) => theme.color.primary['900']};
  }
`;
