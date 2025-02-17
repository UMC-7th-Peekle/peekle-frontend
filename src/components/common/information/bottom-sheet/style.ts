import styled from 'styled-components';
import { motion } from 'framer-motion';
import LineSVG from '@/assets/images/icons/horizontal-line.svg?react';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export const BottomSheet = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0px 0px;
  background: ${({ theme }) => theme.color.gray[0]};
  & > * {
    width: 100%;
  } //자식요소가 width를 100%로 채우게
`;

export const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0 18px 0;
  cursor: pointer;
`;

export const lineIcon = styled(LineSVG)`
  width: 32px;
  color: ${({ theme }) => theme.color.gray[100]};
`;

export const BottomSheetContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
