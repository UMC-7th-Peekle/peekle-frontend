import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto; // ✅ 높이 자동 조정
  background-color: white;
  border: 1px solid ${theme.color.gray[50]};
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
  gap: 8px;
  transition: bottom 0.3s ease;
`;

const InputWrapper = styled.div<{ $hasText: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 16px;
  margin-right: ${({ $hasText }) => ($hasText ? '0px' : '16px')};
  min-height: 48px;
  max-height: 120px; // ✅ 최대 높이 설정
  background-color: ${theme.color.gray[50]};
  border-radius: 24px;
  position: relative;
  transition: width 0.3s ease;
`;

const AnonymousCheckWrapper = styled.div`
  position: absolute;
  left: 16px;
  bottom: 14px;
`;

// ✅ StyledTextarea (줄바꿈 지원)
const StyledTextarea = styled.textarea`
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 500;
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  caret-color: ${theme.color.gray[900]};
  padding-left: 76px;
  padding-top: 14px;
  padding-bottom: 14px;
  resize: none;
  min-height: 48px;
  max-height: 120px;
  overflow-y: auto;
  line-height: 1.5;
  width: 50%;

  &::-webkit-input-placeholder {
    color: #bbb;
  }
`;

const SendButton = styled.button`
  margin-bottom: 20px;
  width: 34px;
  height: 34px;
  background-color: ${theme.color.gray[600]};
  border: none;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;
  margin-right: 16px;
`;

export {
  Container,
  InputWrapper,
  AnonymousCheckWrapper,
  StyledTextarea,
  SendButton,
};
