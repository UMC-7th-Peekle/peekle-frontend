import * as S from './style';
import { useNavigate } from 'react-router-dom';

const Header = ({ page }: { page: 'event' | 'community' }) => {
  const navigate = useNavigate();
  const title = page === 'event' ? '이벤트' : '커뮤니티';

  const handleHeartIconClick = () => {
    if (page === 'event') navigate('/event/scrap');
    else navigate('/community/scrap');
  };

  const handleSearchIconClick = () => {
    if (page === 'event') navigate('/event/search');
    else navigate('/community/search');
  };

  return (
    <S.HeaderContainer>
      <S.Logo />
      <S.Title>{title}</S.Title>
      <S.IconWrapper>
        <S.HeartIcon onClick={handleHeartIconClick} />
        <S.SearchIcon onClick={handleSearchIconClick} />
      </S.IconWrapper>
    </S.HeaderContainer>
  );
};

export default Header;
