import styled from 'styled-components';
import locationSVG from '@/assets/images/icons/location.svg?react';
import coinSVG from '@/assets/images/icons/coin.svg?react';
import DefaultImageSVG from '@/assets/images/event/card/default-image-icon.svg?react';

export const EventCard = styled.div`
  display: flex;
  gap: 16px;
`;

export const ImageContainer = styled.div`
  width: 116px;
  height: 116px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.color.gray[50]};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DefaultImageIcon = styled(DefaultImageSVG)`
  width: 48px;
  height: 48px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 0;
  gap: 4px;
`;

export const Top = styled.div`
  display: flex;
  gap: 4px;
`;

export const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.color.gray[400]};
`;

export const LocationIcon = styled(locationSVG)`
  width: 16px;
  height: 16px;
`;

export const CoinIcon = styled(coinSVG)`
  width: 16px;
  height: 16px;
`;

export const Text = styled.span`
  ${({ theme }) => theme.typeFace.caption['14R']}
`;

export const Seperater = styled.span`
  color: ${({ theme }) => theme.color.gray[400]};
`;

export const Title = styled.div`
  ${({ theme }) => theme.typeFace.body['18SB']}
  color: ${({ theme }) => theme.color.gray[900]};
`;

export const Date = styled.div`
  ${({ theme }) => theme.typeFace.body['15M']}
  color: ${({ theme }) => theme.color.gray[400]};
`;
