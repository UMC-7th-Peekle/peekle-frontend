import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Authority, EventListWithFilter, FilterTabs } from '@/components';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    navigate(ROUTES.ADMIN_SEARCH);
  };

  const handleUserIconClick = () => {
    navigate(ROUTES.USER);
  };

  return (
    <S.HeaderContainer>
      <S.MainHeader>
        <S.Logo />
        <S.Title>관리자</S.Title>
        <S.IconWrapper>
          <S.SearchIcon onClick={handleSearchIconClick} />
          <S.UserIcon onClick={handleUserIconClick} />
        </S.IconWrapper>
      </S.MainHeader>
      <FilterTabs defaultValue={'홈'} option="관리자 탭">
        <FilterTabs.List>
          <FilterTabs.Trigger value={'홈'} label="홈" />
          <FilterTabs.Trigger value={'이벤트'} label="이벤트" />
          <FilterTabs.Trigger value={'커뮤니티'} label="커뮤니티" />
          <FilterTabs.Trigger value={'문의'} label="문의" />
          <FilterTabs.Trigger value={'권한'} label="권한" />
        </FilterTabs.List>
        <FilterTabs.Panel value={'홈'}>
          <div>홈</div>
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'이벤트'}>
          <EventListWithFilter />
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'커뮤니티'}>
          <div>커뮤니티</div>
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'문의'}>
          <div>문의</div>
        </FilterTabs.Panel>
        <FilterTabs.Panel value={'권한'}>
          <Authority />
        </FilterTabs.Panel>
      </FilterTabs>
    </S.HeaderContainer>
  );
};

export default AdminHeader;
