import styled from 'styled-components';
import { ValidateInput } from '@/components';

export const FormContainer = styled.section`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const FormField = styled.div`
  width: 100%;
`;

export const FormInput = styled(ValidateInput)`
  width: 100%;
`;
