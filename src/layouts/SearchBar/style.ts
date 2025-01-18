import styled from 'styled-components';
import Back from '@/assets/images/icons/back.svg?react';
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

export const BackIcon = styled(Back)`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover path {
    stroke: ${({ theme }) => theme.color.primary['900']};
  }
`;

export const MapIcon = styled(Map)`
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:hover path {
    stroke: ${({ theme }) => theme.color.primary['900']};
  }
`;
