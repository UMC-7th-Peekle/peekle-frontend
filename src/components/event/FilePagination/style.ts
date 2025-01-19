import styled, { css } from 'styled-components';
import ArrowLeftSVG from '@/assets/images/icons/arrow-left.svg?react';
import ArrowRightSVG from '@/assets/images/icons/arrow-right.svg?react';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${theme.borderRadius.xlg};
`;

const TextStyle = css`
  color: ${theme.color.gray[400]};
  ${theme.typeFace.caption['13R']};
`;

export const PageText = styled.span`
  ${TextStyle}
  color: ${theme.color.gray[0]};
`;

export const Separator = styled.span`
  ${TextStyle}
`;

export const TotalPageText = styled.span`
  ${TextStyle}
`;

const IconStyle = css`
  width: 12px;
  height: 12px;
  color: ${theme.color.gray[0]};
`;

export const PrevBtn = styled(ArrowLeftSVG)`
  ${IconStyle}
`;

export const NextBtn = styled(ArrowRightSVG)`
  ${IconStyle}
`;
