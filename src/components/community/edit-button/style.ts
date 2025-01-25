import { theme } from '@/styles/theme';
import styled from 'styled-components';
import Pen from '@/assets/images/icons/pen.svg?react';

const RectTypeContainer = styled.button`
  height: 51px;
  width: 145px;
  background-color: ${theme.color.primary[500]};
  color: ${theme.color.gray[0]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 8px;
`;

const PenIcon = styled(Pen)`
  width: 20px;
  path {
    fill: ${theme.color.gray[0]};
  }
`;

const ButtonText = styled.p`
  ${theme.typeFace.body['16SB']};
`;

export { RectTypeContainer, PenIcon, ButtonText };
