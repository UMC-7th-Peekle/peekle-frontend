import Navbar from '@/layouts/navbar';
import * as S from './style';
import { Outlet, useLocation } from 'react-router-dom';
import { routesWithNavbar } from '@/layouts/outlet/const';
import { useNavbarStore } from '@/stores/layout/useNavbarStore';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();
  const { shouldShowNavbar, setShouldShowNavbar } = useNavbarStore();

  useEffect(() => {
    setShouldShowNavbar(routesWithNavbar.includes(location.pathname));
  }, [location.pathname, setShouldShowNavbar]);

  return (
    <S.MainContainer>
      <Outlet />
      {shouldShowNavbar && <Navbar />}
    </S.MainContainer>
  );
};

export default Layout;
