import styled from 'styled-components';
import Map from '@/assets/images/icons/map.svg?react';

export const SearchBarWrapper3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 8px;
`;

export const SearchBarWrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  margin-top: 8px;
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
