import styled from 'styled-components';
import { theme } from '@/styles/theme';
import wifiXRoundedSVG from '@/assets/images/icons/wifi-x-rounded.svg?react';
import warningRoundedSVG from '@/assets/images/icons/warning-rounded.svg?react';

export const BackwardWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 22px;
`;

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  text-align: center;
`;

export const ErrorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

export const WifiXIcon = styled(wifiXRoundedSVG)`
  width: 78px;
  height: 78px;
`;

export const WarningIcon = styled(warningRoundedSVG)`
  width: 78px;
  height: 78px;
`;

export const ErrorTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const ErrorText = styled.h2`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['18SB']};
`;

export const ErrorSubText = styled.h3`
  color: ${theme.color.gray[400]};
  ${theme.typeFace.body['16R']};
`;
