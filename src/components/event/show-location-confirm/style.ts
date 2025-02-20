import styled from 'styled-components';
import LocationSVG from '@/assets/images/icons/location-filled.svg?react';
import mediaQuery from '@/styles/mediaQuery';

export const LocationConfirm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 284px;

  ${mediaQuery.sMobile`
    width: 250px;
  `}
`;

export const ConfirmInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
`;

export const LocationIcon = styled(LocationSVG)`
  width: 24px;
  height: 24px;
`;

export const ConfirmText = styled.h2`
  color: ${({ theme }) => theme.color.gray[600]};
  ${({ theme }) => theme.typeFace.subTitle['20']};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.color.gray[500]};
  ${({ theme }) => theme.typeFace.body['15M']};
`;

export const ConfirmButton = styled.button`
  ${({ theme }) => theme.typeFace.body['18SB']};
  color: ${({ theme }) => theme.color.gray[0]};
  background: ${({ theme }) => theme.color.primary[500]};
`;

export const NotConfirmButton = styled.button`
  ${({ theme }) => theme.typeFace.body['18SB']};
  background: ${({ theme }) => theme.color.gray[500]};
`;

export const BtnContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
