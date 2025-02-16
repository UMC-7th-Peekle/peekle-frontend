import styled from 'styled-components';
import { theme } from '@/styles/theme';
import DefaultImageSVG from '@/assets/images/event/card/default-image-icon.svg?react';
import { motion } from 'framer-motion';

export const ImageSliderContainer = styled.article`
  width: 100%;
  height: 270px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.color.gray[50]};
`;

export const ImageSliderWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageSlider = styled(motion.div)``;

export const ImageItem = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
