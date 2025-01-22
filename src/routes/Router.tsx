import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InputComponentsPage from '@/pages/test/InputComponentsPage';
import CalendarPage from '@/pages/test/CalendarPage';
import { SearchBarPage } from '@/pages/test/SearchBarPage';
import Layout from '@/layouts/outlet';
import EventMapPage from '@/pages/event/EventMapPage';
import EventPage from '@/pages/event/EventPage';
import UserPage from '@/pages/user/page';
import { ROUTES } from '@/constants/routes';
import { CommunityLikePage, CommunityPage, CommunitySearchPage } from '@/pages';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  // 로그인 여부 확인해 페이지 보호 필요
  return children;
};

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ProtectedPage>
          <Layout />
        </ProtectedPage>
      ),
      // errorElement: <NotFoundPage />,
      children: [
        {
          path: '/event',
          element: <EventPage />,
        },
        {
          path: '/event/map',
          element: <EventMapPage />,
        },
        {
          path: '/auth/signup',
          // element: <SignUpPage />
        },
        {
          path: '/auth/signin',
          // element: <SignInPage />
        },
        {
          path: ROUTES.COMMUNITY,
          element: <CommunityPage />,
        },
        {
          path: ROUTES.COMMUNITY_SEARCH,
          element: <CommunitySearchPage />,
        },
        {
          path: ROUTES.COMMUNITY_LIKE,
          element: <CommunityLikePage />,
        },
        {
          path: '/user',
          element: <UserPage />,
        },
        {
          path: '/test/input-components',
          element: <InputComponentsPage />,
        },
        {
          path: '/test/calendar',
          element: <CalendarPage />,
        },
        {
          path: '/test/searchbar',
          element: <SearchBarPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.PUBLIC_URL,
  },
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
