import styled from 'styled-components';
import WarningSVG from '@/assets/images/icons/warning.svg?react';

export const AlertContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 40px 12px 40px;
  gap: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.color.gray[0]};
  z-index: 11;
  text-align: center;
`;

export const WarningIcon = styled(WarningSVG)`
  width: 32px;
  height: 32px;
`;

export const AlertMessage = styled.p`
  ${({ theme }) => theme.typeFace.subTitle[20]};
  color: ${({ theme }) => theme.color.gray[600]};
`;

export const CheckedBtn = styled.button`
  padding: 11.5px 96.5px 12.5px 100.5px;
  ${({ theme }) => theme.typeFace.subTitle['20']};
  color: ${({ theme }) => theme.color.primary[500]};
`;
