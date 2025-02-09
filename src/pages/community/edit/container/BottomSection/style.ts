import styled from 'styled-components';
import { theme } from '@/styles/theme';
import CameraSvg from '@/assets/images/community/camera.svg?react';

export const BottomBar = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${theme.color.gray[0]};
`;

export const CameraButton = styled(CameraSvg)`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
