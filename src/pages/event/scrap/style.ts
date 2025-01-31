import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const EventScrapContainer = styled.section`
  width: 100%;
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  width: 100%;
  height: 64px;
  padding: 16px 0;
  align-items: center;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${theme.typeFace.subTitle[20]}
  color: ${theme.color.gray[900]};
`;

export const CategoryFilterWrapper = styled.div`
  margin: 8px 0 16px;
`;
