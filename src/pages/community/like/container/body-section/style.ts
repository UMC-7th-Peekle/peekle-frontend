import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: center;
  justify-items: start;
  width: 100%;
`;

const NoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PeekleLikeImage = styled.div`
  margin-top: 48px;
  width: 80%;
  height: 180px;
  background-image: url('/image/peekle-like.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.gray[400]};
  ${theme.typeFace.body['18R']};
  svg {
    margin-left: 6px;
    width: 24px;
    height: 20px;
    path {
      fill: ${theme.color.gray[200]};
    }
    padding: 0;
  }
`;

export { Container, NoneContainer, PeekleLikeImage, Text };
