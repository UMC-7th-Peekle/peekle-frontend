import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  height: 100vh;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 16px;
  margin-left: -10px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${(props) => props.color || '#666'};
  margin-top: -10px;
  margin-bottom: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  margin-left: -10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  margin-left: -10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const Input = styled.input`
  width: 110%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background-color: #ffffff;
  &:focus {
    border-bottom: 2px solid #4aa662;
  }
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: black;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 0px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const AgreementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
`;

const AgreementItem = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 20px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const CompleteButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#4aa662')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  margin-top: 20px;
`;

export {
  Checkbox,
  CompleteButton,
  AgreementItem,
  AgreementWrapper,
  ModalContent,
  ModalSubtitle,
  ModalTitle,
  Input,
  InputWrapper,
  Label,
  Container,
  ButtonWrapper,
  Title,
  Subtitle,
};
