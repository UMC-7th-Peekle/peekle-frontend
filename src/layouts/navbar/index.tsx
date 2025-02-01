import * as S from './style';
import { Link, useLocation } from 'react-router-dom';
import Community from '@/assets/images/navbar/community.svg?react';
import CommunityFocus from '@/assets/images/navbar/community.focus.svg?react';
import Event from '@/assets/images/navbar/event.svg?react';
import EventFocus from '@/assets/images/navbar/event.focus.svg?react';
import User from '@/assets/images/navbar/user.svg?react';
import UserFocus from '@/assets/images/navbar/user.focus.svg?react';
import { ROUTES } from '@/constants/routes';

const Navbar = () => {
  const location = useLocation();

  return (
    <S.NavbarContainer>
      {/* Event */}
      <S.NavItem>
        <Link to={ROUTES.EVENT}>
          {location.pathname.includes('event') ? <EventFocus /> : <Event />}
        </Link>
      </S.NavItem>

      {/* Community */}
      <S.NavItem>
        <Link to={ROUTES.COMMUNITY}>
          {location.pathname.includes('community') ? (
            <CommunityFocus />
          ) : (
            <Community />
          )}
        </Link>
      </S.NavItem>

      {/* User */}
      <S.NavItem>
        <Link to={ROUTES.USER}>
          {location.pathname.includes('user') ? <UserFocus /> : <User />}
        </Link>
      </S.NavItem>
    </S.NavbarContainer>
  );
};

export default Navbar;
