import styled from 'styled-components';

export const BackwardWrapper = styled.div`
  position: fixed;
  top: 22px;
  left: 20px;
`;

export const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
