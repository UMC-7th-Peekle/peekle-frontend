import styled from 'styled-components';
import { ValidateInput, ValidateSelect } from '@/components';
import { theme } from '@/styles/theme';

export const Form = styled.form`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

export const FormTitle = styled.h1`
  ${theme.typeFace.body['18SB']};
  color: ${theme.color.gray[900]};
`;

export const FormField = styled.div`
  width: 100%;
`;

// 옆에 버튼 있는 input이나 설명 있는 select
export const FormInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FormInput = styled(ValidateInput)`
  width: 100%;
  flex: 1;
`;

export const FormInputTitle = styled.span`
  white-space: nowrap;
  ${theme.typeFace.caption['14B']};
`;

export const FormSelect = styled(ValidateSelect)`
  flex: 1;
`;
