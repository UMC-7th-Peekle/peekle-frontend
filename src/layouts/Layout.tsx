import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <S.MainContainer>
      <Outlet />
    </S.MainContainer>
  );
};

export default Layout;
