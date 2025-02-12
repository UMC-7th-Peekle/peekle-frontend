import Backward from '@/components/common/backward';
import styled from 'styled-components';

export default function FixedBackward() {
  return (
    <BackwardWrapper>
      <Backward />
    </BackwardWrapper>
  );
}

const BackwardWrapper = styled.div`
  position: fixed;
  top: 22px;
  left: 20px;
`;
