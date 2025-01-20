import Navbar from '@/layouts/navbar';
import * as S from './style';
import { Outlet, useLocation } from 'react-router-dom';
import { routesWithNavbar } from '@/layouts/outlet/const';

const Layout = () => {
  const location = useLocation();

  const shouldShowNavbar = routesWithNavbar.includes(location.pathname);

  return (
    <S.MainContainer>
      <Outlet />
      {shouldShowNavbar && <Navbar />}
    </S.MainContainer>
  );
};

export default Layout;
