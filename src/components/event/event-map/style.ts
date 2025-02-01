import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100vw;
  height: calc(100vh - var(--nav-height)); // nav 영역 빼기
  margin-left: -16px;
  position: absolute;
  top: 0;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  bottom: calc(20px + var(--nav-height));
`;
