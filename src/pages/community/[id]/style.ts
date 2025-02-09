import { theme } from '@/styles/theme';
import styled from 'styled-components';

// ✅ 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// ✅ 상단 AppBar 스타일
const Appbar = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
`;

// ✅ 제목 스타일
const Title = styled.h1`
  color: black;
  ${theme.typeFace.subTitle[20]};
`;

// ✅ 구분선 스타일
const Boundary = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${theme.color.gray[50]};
`;

export { MainContainer, Title, Appbar, Boundary };
