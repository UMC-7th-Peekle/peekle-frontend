import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import LogoSVG from '@/assets/images/layout/logo.svg?react';
import SearchSVG from '@/assets/images/icons/search.svg?react';
import UserSVG from '@/assets/images/icons/profile.svg?react';

export const HeaderContainer = styled.header`
  margin-top: 10px;
`;

export const MainHeader = styled.div`
  display: flex;
  height: 44px;
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
  gap: 16px;
`;

const IconStyle = css`
  width: 22px;
  height: 22px;
  color: ${theme.color.gray[600]};
`;

export const SearchIcon = styled(SearchSVG)`
  ${IconStyle}
`;
export const UserIcon = styled(UserSVG)`
  ${IconStyle}
`;
