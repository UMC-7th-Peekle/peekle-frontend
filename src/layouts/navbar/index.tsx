import * as S from './style';
import { Link, useLocation } from 'react-router-dom';
import Community from '@/assets/images/navbar/community.svg?react';
import CommunityFocus from '@/assets/images/navbar/community.focus.svg?react';
import Event from '@/assets/images/navbar/event.svg?react';
import EventFocus from '@/assets/images/navbar/event.focus.svg?react';
import User from '@/assets/images/navbar/user.svg?react';
import UserFocus from '@/assets/images/navbar/user.focus.svg?react';
import { ROUTES } from '@/layouts/navbar/const';

const Navbar = () => {
  const location = useLocation();

  return (
    <S.NavbarContainer>
      {/* Event */}
      <S.NavItem>
        <Link to={ROUTES.event}>
          {location.pathname === ROUTES.event ? <EventFocus /> : <Event />}
        </Link>
      </S.NavItem>

      {/* Community */}
      <S.NavItem>
        <Link to={ROUTES.community}>
          {location.pathname === ROUTES.community ? (
            <CommunityFocus />
          ) : (
            <Community />
          )}
        </Link>
      </S.NavItem>

      {/* User */}
      <S.NavItem>
        <Link to={ROUTES.user}>
          {location.pathname === ROUTES.user ? <UserFocus /> : <User />}
        </Link>
      </S.NavItem>
    </S.NavbarContainer>
  );
};

export default Navbar;
