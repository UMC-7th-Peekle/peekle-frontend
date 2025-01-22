import styled from 'styled-components';

export const Overlay = styled.div<{ $isDropdown: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 111;
  background: ${({ $isDropdown }) =>
    $isDropdown
      ? 'transparent' // dropdown은 배경 없음
      : 'rgba(0, 0, 0, 0.25)'};
  mix-blend-mode: darken;
`;
