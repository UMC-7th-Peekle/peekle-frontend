import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  color: ${theme.color.primary[400]};
  ${theme.typeFace.body['18SB']};
  text-decoration: none;
`;
