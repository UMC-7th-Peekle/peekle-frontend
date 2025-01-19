import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

export const EmptyText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.typeFace.body['18R']}
  color: ${({ theme }) => theme.color.gray[500]};
`;
