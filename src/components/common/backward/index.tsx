import * as S from './style';
import { useNavigate } from 'react-router-dom';

const Backward = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return <S.BackIcon onClick={handleBackClick} />;
};
export default Backward;
