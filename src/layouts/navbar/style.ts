import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: var(--nav-height);
  padding: 4px 64px 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${theme.color.gray[0]};
  z-index: 120; // 모달 다음으로 가장 위에 위치하게
`;

export const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
