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
import CommunityPage from '@/pages/community/page';
import UserPage from '@/pages/user/page';
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
          path: '/community',
          element: <CommunityPage />,
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
