import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 72px;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: ${theme.color.gray[0]};
  z-index: 120; // 모달 다음으로 가강 위에 위치하게
`;

export const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 60px;
    height: 60px;
  }
`;
