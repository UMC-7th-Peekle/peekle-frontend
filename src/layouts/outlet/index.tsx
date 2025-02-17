import { useEffect } from 'react';
import Navbar from '@/layouts/navbar';
import * as S from './style';
import { Outlet, useLocation } from 'react-router-dom';
import { routesWithNavbar } from '@/layouts/outlet/const';
import { useNavbarStore } from '@/stores/layout/useNavbarStore';
import normalizePath from '@/utils/normalizePath';

const Layout = () => {
  const location = useLocation();
  const { shouldShowNavbar, setShouldShowNavbar } = useNavbarStore();

  useEffect(() => {
    const shouldShow = routesWithNavbar.includes(
      normalizePath(location.pathname),
    );
    setShouldShowNavbar(shouldShow);
  }, [location.pathname, setShouldShowNavbar]);

  return (
    <S.MainContainer $shouldShowNavbar={shouldShowNavbar}>
      <Outlet />
      {shouldShowNavbar && <Navbar />}
    </S.MainContainer>
  );
};

export default Layout;
