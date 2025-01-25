import styled from 'styled-components';
import WarningSVG from '@/assets/images/icons/warning.svg?react';
import CameraSVG from '@/assets/images/icons/camera.svg?react';
import { theme } from '@/styles/theme';

export const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 40px 12px 40px;
  gap: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.color.gray[0]};
  z-index: 11;
  text-align: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

export const WarningIcon = styled(WarningSVG)`
  width: 32px;
  height: 32px;
`;

export const CameraIcon = styled(CameraSVG)`
  width: 32px;
  height: 32px;
`;

export const AlertMessage = styled.p`
  ${({ theme }) => theme.typeFace.subTitle[20]};
  color: ${({ theme }) => theme.color.gray[600]};
  white-space: pre-wrap; // 입력받은 문자열 줄바꿈 유지
`;

export const OneBtn = styled.button`
  display: flex;
  flex: 1 0 0;
  height: 56px;
  padding: 11.5px 96.5px 12.5px 100.5px;
  align-items: center;
  ${theme.typeFace.subTitle['20']};
  color: ${theme.color.primary[500]};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const TwoBtns1 = styled.button`
  display: flex;
  flex: 1 0 0;
  height: 56px;
  padding: 11.5px 34.5px 12.5px 38.5px;
  align-items: center;
  flex: 1 0 0;
  ${theme.typeFace.subTitle['20']};
  color: ${theme.color.gray[200]};
`;

export const TwoBtns2 = styled(TwoBtns1)`
  color: ${theme.color.primary[500]};
`;
