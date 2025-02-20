import { theme } from '@/styles/theme';
import styled from 'styled-components';
import Pen from '@/assets/images/icons/pen.svg?react';

const DefaultTypeContainer = styled.button`
  height: 40px;
  width: 99px;
  border-radius: 50px;
  background-color: ${theme.color.gray[0]};
  color: ${theme.color.gray[600]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: filter 0.2s ease;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);

  &:active {
    filter: brightness(0.9);
  }
`;

const RectTypeContainer = styled(DefaultTypeContainer)`
  height: 48px;
  width: 135px;
  border-radius: 8px;
  background-color: ${theme.color.gray[600]};
`;

const PenIcon = styled(Pen)`
  width: 20px;
  path {
    fill: ${theme.color.gray[600]};
  }
`;

const PenIconRect = styled(Pen)`
  width: 20px;
  path {
    fill: ${theme.color.gray[0]};
  }
`;

const ButtonText = styled.p`
  ${theme.typeFace.body['16SB']};
  color: ${theme.color.gray[0]};
`;

const DarkButtonText = styled.p`
  ${theme.typeFace.body['16SB']};
  color: ${theme.color.gray[600]};
`;

export {
  DarkButtonText,
  PenIconRect,
  DefaultTypeContainer,
  RectTypeContainer,
  PenIcon,
  ButtonText,
};
