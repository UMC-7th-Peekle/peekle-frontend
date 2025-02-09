import styled from 'styled-components';
import CheckSvg from '@/assets/images/community/check.svg?react';
import { theme } from '@/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const CheckContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isChecked',
})<{ isChecked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ isChecked }) =>
    isChecked ? theme.color.gray[600] : theme.color.gray[0]};
  border: ${({ isChecked }) => (isChecked ? 'none' : '2px solid')};
  border-color: ${theme.color.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Check = styled(CheckSvg).withConfig({
  shouldForwardProp: (prop) => prop !== 'isChecked',
})<{ isChecked: boolean }>`
  width: 11px;
  display: ${({ isChecked }) => (isChecked ? 'block' : 'hidden')};
  path {
    stroke: ${theme.color.gray[0]};
  }
`;

const Text = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'isChecked',
})<{ isChecked: boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ isChecked }) =>
    isChecked ? theme.color.gray[600] : theme.color.gray[400]};
`;

export { Container, Check, Text, CheckContainer };
