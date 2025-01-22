import styled from 'styled-components';

export const ConfirmContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 34px 18px 29px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.color.gray[0]};
  z-index: 121;
  text-align: center;
`;
