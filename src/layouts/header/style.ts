import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import LogoSVG from '@/assets/images/layout/logo.svg?react';
import HeartSVG from '@/assets/images/icons/heart.svg?react';
import SearchSVG from '@/assets/images/icons/search.svg?react';

export const HeaderContainer = styled.header`
  display: flex;
  height: 44px;
  padding: 16px 0;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

export const Logo = styled(LogoSVG)`
  width: 82.5px;
  height: 22px;
`;

export const Title = styled.h1`
  ${theme.typeFace.body['18SB']};
  color: ${theme.color.gray[900]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  align-self: stretch;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 24px;
  color: ${theme.color.gray[600]};
`;

const IconStyle = css`
  width: 24px;
  height: 24px;
`;
export const HeartIcon = styled(HeartSVG)`
  ${IconStyle}
`;
export const SearchIcon = styled(SearchSVG)`
  ${IconStyle}
`;
