import styled from 'styled-components';
import { theme } from '@/styles/theme';
import DefaultImageSVG from '@/assets/images/event/card/default-image-icon.svg?react';

export const EventCard = styled.div`
  display: flex;
  gap: 20px;
  align-self: stretch;
  width: 100%;
  justify-content: space-between;
  background-color: ${theme.color.gray[0]};
`;

export const ImageContainer = styled.div`
  width: 96px;
  height: 96px;
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
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
`;

export const Title = styled.div`
  ${({ theme }) => theme.typeFace.body['16SB']}
  color: ${({ theme }) => theme.color.gray[900]};
`;

export const SubInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SubInfo = styled.div`
  display: flex;
  padding: 6px 10px;
  align-items: center;
  border-radius: ${theme.borderRadius.xsm};
  background-color: ${theme.color.gray[50]};
  color: ${theme.color.gray[500]};
  ${({ theme }) => theme.typeFace.caption['13B']}
`;
