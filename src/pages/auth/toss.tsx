import styled from 'styled-components';
import { Backward } from '@/components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  height: 100vh;
  box-sizing: border-box;
`;

const BackwardWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 40px;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 16px;
  margin-top: 60px;
  color: black;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: ${(props) => props.color || '#666'};
  margin-top: 10px;
  margin-bottom: 16px;
`;
const Content = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${(props) => props.color || '#666'};
  margin-top: 10px;
  margin-bottom: 16px;
`;
const TossPage = () => {
  return (
    <Container>
      <BackwardWrapper>
        <Backward />
      </BackwardWrapper>
      <Title>피클 서비스 이용약관</Title>
      <Subtitle>제1조 (목적)</Subtitle>
      <Content>
        대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.
        언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지아니한다.
        대통령은 제3항과 제4항의 사유를 지체없이 공포하여야 한다. 누구든지 체포
        또는 구속의 이유와 변호인의 조력을 받을 권리가 있을을 고지받지아니하고는
        체포 또는 구속을 당하지 아니한다. 체포또는 구속을 당한자의 가족등 법률이
        정하는 자에게는 그 이유와 일시·장소가 지체없이 통지되어야한다.
      </Content>
      <Subtitle>제2조 (용어의 정의)</Subtitle>
      <Content>
        대통령은 내우·외환·천재·지변 또는 중대한 재정·경제상의 위기에 있어서
        국가의 안전보장 또는 공공의 안녕질서를 유지하기 위하여 긴급한 조치가
        필요하고 국회의 집회를 기다릴 여유가 없을 때에 한하여 최소한으로 필요한
        재정·경제상의 처분을 하거나 이에 관하여 법률의 효력을 가지는 명령을 발할
        수 있다.
        <br />
        <br />
        대통령은 국가의 원수이며, 외국에 대해여 국가를 대표한다. 군인은 현역을
        면한 후가 아니면 국무위원으로 임명할 수 없다. 정당의 설립은
        자유이며,복수정당체
      </Content>
    </Container>
  );
};

export default TossPage;
