import { theme } from '@/styles/theme';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  background-color: ${theme.color.gray[0]};
  margin-bottom: 16px;
  padding: 0px 16px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: start;
  gap: 12px;
`;

const ProfileImage = styled.div<{ image: string; size?: string }>`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 50%;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const ProfileName = styled.p`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['16SB']};
`;

const ProfileDate = styled.p`
  color: ${theme.color.gray[500]};
  ${theme.typeFace.caption['14R']};
`;

const Title = styled.h1`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.subTitle[20]};
`;

const Content = styled.p`
  color: ${theme.color.gray[900]};
  ${theme.typeFace.body['16R']};
`;

const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 8px;
`;

export {
  MainContainer,
  Profile,
  ProfileDate,
  ProfileImage,
  ProfileName,
  ProfileTextContainer,
  Title,
  Content,
  CountWrapper,
};
