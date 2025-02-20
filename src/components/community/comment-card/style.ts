import { theme } from '@/styles/theme';
import styled from 'styled-components';
import ListSvg from '@/assets/images/icons/three-dot.svg?react';

const MainContainer = styled.div<{ $highlight: boolean }>`
  background-color: ${({ $highlight }) =>
    $highlight ? theme.color.primary[100] : 'transparent'};
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
  padding: 16px 28px 16px 20px;
  height: auto;
`;

const ReplyContainer = styled.div<{ $highlight: boolean }>`
  background-color: ${({ $highlight }) =>
    $highlight ? theme.color.primary[100] : 'transparent'};
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: start;
  padding: 16px 28px 16px 20px;
  height: auto;
`;

const ReplyWrapper = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  justify-content: center;
  padding-right: 8px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 40px;
  height: auto;
`;

const ProfileImage = styled.div<{ image: string; size?: string }>`
  width: ${({ size }) => size || '32px'};
  height: ${({ size }) => size || '32px'};
  border-radius: 50%;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  width: 290px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 10px;
  word-break: break-word;
  white-space: pre-wrap;
`;

const TopTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
`;

const Content = styled.div<{ $isDeleted: boolean }>`
  ${theme.typeFace.body['16R']};
  color: ${({ $isDeleted, theme }) =>
    $isDeleted ? theme.color.gray[200] : theme.color.gray[900]};
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

const ReplyButton = styled.p`
  color: ${theme.color.gray[200]};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const ListButton = styled(ListSvg)`
  cursor: pointer;
  width: 13px;
  path {
    stroke: ${theme.color.gray[400]};
  }
`;

const Nickname = styled.p`
  color: ${theme.color.gray[600]};
  ${theme.typeFace.caption['14B']};
  font-size: 15px;
`;

const Date = styled.p`
  color: ${theme.color.gray[400]};
  ${theme.typeFace.caption['14R']};
  font-size: 15px;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: auto; /* ✅ 너비를 자동으로 확장 */
  height: auto;
  flex-grow: 1; /* ✅ 남은 공간을 차지 */
`;

export {
  MainContainer,
  Container,
  LeftContainer,
  ProfileWrapper,
  ProfileImage,
  TopTextContainer,
  Nickname,
  Date,
  Content,
  ReplyButton,
  BottomContainer,
  ListButton,
  ReplyContainer,
  ReplyWrapper,
};
