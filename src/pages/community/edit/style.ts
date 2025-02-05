import { theme } from '@/styles/theme';
import styled from 'styled-components';
import CameraSvg from '@/assets/images/community/camera.svg?react';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;

const Appbar = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  flex-shrink: 0;
`;

const Title = styled.h1`
  color: black;
  ${theme.typeFace.subTitle[20]};
`;

const SubmitButton = styled.div`
  ${theme.typeFace.subTitle[20]};
  color: ${theme.color.gray[100]};
`;

const TitleField = styled.input`
  ${theme.typeFace.subTitle[20]};
  margin-top: 4px;
  background: transparent;
  border: none;
  border-bottom: 0.5px solid ${theme.color.gray[100]};
  outline: none;
  resize: none;
  padding: 16px 0;
  width: 100%;
  color: ${theme.color.gray[900]};
  &::placeholder {
    color: ${theme.color.gray[400]};
    opacity: 1;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ContentField = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  margin-top: 16px;
  width: 100%;
  resize: none;
  overflow-y: auto;
  font-size: 17px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.02em;
  font-family: 'pretendard';
  color: ${theme.color.gray[900]};
  &::placeholder {
    color: ${theme.color.gray[400]};
    opacity: 1;
  }
`;

const BottomBar = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const CameraButton = styled(CameraSvg)``;

export {
  MainContainer,
  Appbar,
  Title,
  SubmitButton,
  TitleField,
  ContentContainer,
  ContentField,
  BottomBar,
  CameraButton,
};
