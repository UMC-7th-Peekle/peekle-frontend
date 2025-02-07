import { theme } from '@/styles/theme';
import styled from 'styled-components';

// 제일 바깥쪽 컨테이너너
const Container = styled.div`
  padding-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
`;

// 왼쪽 컨테이너
const LeftContainer = styled.div`
  width: 75%;
  height: 131px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  border-bottom: 1px solid;
  border-color: ${theme.color.gray[50]};
`;

// 오른른쪽 컨테이너
const RightContainer = styled.div`
  width: 25%;
  height: 131px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid;
  border-color: ${theme.color.gray[50]};
`;

const Title = styled.div`
  ${theme.typeFace.body['16SB']};
  color: ${theme.color.gray[900]};
  margin-bottom: 4px;
`;

const Content = styled.p`
  height: 56px;
  font-size: 15px;
  font-weight: 400;
  color: ${theme.color.gray[500]};
  margin-bottom: 12px;
`;

// Count 컴포넌트를 감싸는 컨테이너
const CounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Date = styled.p`
  ${theme.typeFace.caption['14R']};
  color: ${theme.color.gray[200]};
`;

const Thumbnail = styled.div<ThumbnailProps>`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;
interface ThumbnailProps {
  image: string;
}

const SizedBox = styled.div`
  width: 80px;
  height: 80px;
`;

export {
  LeftContainer,
  RightContainer,
  Title,
  Content,
  Container,
  CounterContainer,
  Date,
  Thumbnail,
  SizedBox,
};
