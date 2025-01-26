import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layouts/outlet';
import {
  EventPage,
  EventMapPage,
  EventSearchPage,
  EventScrapPage,
  EventDetailPage,
  NotFoundPage,
} from '@/pages';
import UserPage from '@/pages/user/page';
import { ROUTES } from '@/constants/routes';
import { CommunityLikePage, CommunityPage, CommunitySearchPage } from '@/pages';
import { ErrorFallback } from '@/components';

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
      errorElement: <ErrorFallback />,
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
          path: '/event/search',
          element: <EventSearchPage />,
        },
        {
          path: '/event/scrap',
          element: <EventScrapPage />,
        },
        {
          path: '/event/:id',
          element: <EventDetailPage />,
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
          path: '*',
          element: <NotFoundPage />, // 404는 라우트로 처리
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
