import { theme } from '@/styles/theme';
import styled from 'styled-components';
import Pen from '@/assets/images/icons/pen.svg?react';

const DefaultTypeContainer = styled.button`
  height: 48px;
  width: 101px;
  border-radius: 50px;
  background-color: ${theme.color.primary[500]};
  color: ${theme.color.gray[0]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const RectTypeContainer = styled(DefaultTypeContainer)`
  height: 51px;
  width: 145px;
  border-radius: 16px;
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

export { DefaultTypeContainer, RectTypeContainer, PenIcon, ButtonText };
