import styled, { css } from 'styled-components';
import MyLocationSVG from '@/assets/images/icons/my-location.svg?react';
import FilterSVG from '@/assets/images/icons/filter.svg?react';
import { theme } from '@/styles/theme';

const ButtonStyle = css`
  display: flex;
  width: 48px;
  height: 48px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 1;

  border-radius: ${theme.borderRadius.sm};
  background: ${theme.color.gray[0]};
  color: ${theme.color.gray[600]};
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const MyLocationSquareButton = styled(MyLocationSVG)`
  ${ButtonStyle}
`;

export const FilterSqaureButton = styled(FilterSVG)`
  ${ButtonStyle}
`;
