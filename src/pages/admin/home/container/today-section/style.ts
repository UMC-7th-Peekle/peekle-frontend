import { theme } from '@/styles/theme';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Title = styled.h1`
  color: ${theme.color.gray[900]};
  font-size: 15px;
  font-weight: 700;
  font-family: 'pretendard';
`;

const CountBox = styled.div`
  width: 37px;
  height: 22px;
  background-color: ${theme.color.gray[600]};
  border-radius: 50px;
  color: ${theme.color.gray[0]};
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const OutRowContainer = styled(TitleContainer)`
  gap: 16px;
`;

const RowContainer = styled(TitleContainer)``;

const TodoBox = styled.div`
  width: 41px;
  height: 22px;
  border-radius: 4px;
  background-color: rgba(24, 85, 218, 0.05);
  color: ${theme.color.sementic.blue};
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoBoxRedTheme = styled(TodoBox)`
  width: 51px;
  background-color: rgba(236, 19, 46, 0.05);
  color: ${theme.color.sementic.red};
`;

const CountText = styled.p`
  font-weight: 700;
  font-size: 14px;
`;

export {
  MainContainer,
  TitleContainer,
  Title,
  CountBox,
  OutRowContainer,
  RowContainer,
  TodoBox,
  TodoBoxRedTheme,
  CountText,
};
