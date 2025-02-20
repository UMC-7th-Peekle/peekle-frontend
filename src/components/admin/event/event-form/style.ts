import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import PlusSVG from '@/assets/images/icons/plus.svg?react';
import XSVG from '@/assets/images/icons/X.svg?react';
import leftSVG from '@/assets/images/icons/arrow-left.svg?react';
import rightSVG from '@/assets/images/icons/arrow-right.svg?react';
import DefaultImageSVG from '@/assets/images/event/card/default-image-icon.svg?react';

export const SectionTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  ${theme.typeFace.body['16SB']};
  align-self: flex-start;
`;

export const ScheduleItem = styled.article`
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.color.gray[50]};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const ScheduleTitleWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const IconStyle = css`
  color: ${theme.color.gray[600]};
  flex-shrink: 0;
  width: 25px;
  height: 25px;
`;

export const PlusIcon = styled(PlusSVG)`
  ${IconStyle}
`;

export const XIcon = styled(XSVG)<{ $size?: string }>`
  ${IconStyle}
  width: ${({ $size }) => $size && $size};
  height: ${({ $size }) => $size && $size};
`;

export const ArrowLeft = styled(leftSVG)`
  width: 30px;
  height: 30px;
`;

export const ArrowRight = styled(rightSVG)`
  width: 30px;
  height: 30px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImagePriviewSection = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImageWrapper = styled.div<{ $imageSize: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $imageSize }) => $imageSize};
  height: ${({ $imageSize }) => $imageSize};
  display: flex;
  position: relative;
  flex-shrink: 0;
`;

export const RemoveImageBtnWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const DefaultImageIcon = styled(DefaultImageSVG)`
  width: 30px;
  height: 30px;
`;

export const CloseFullScreenWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

export const FullScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
