import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const TitleField = styled.input`
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

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const ContentField = styled.textarea`
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

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 104px;
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviewImage = styled.img`
  width: 104px;
  height: 104px;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  border-radius: 8px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const MainImageLabel = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 27px;
  background: black;
  color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  ${theme.typeFace.body['15M']};
`;
