import styled from 'styled-components';
import { theme } from '@/styles/theme';
import DefaultImageSVG from '@/assets/images/event/card/default-image-icon.svg?react';

export const ImageContainer = styled.article`
  width: 100%;
  height: 270px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.color.gray[50]};
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

export const FilePaginationWrapper = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
