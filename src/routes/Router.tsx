import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layouts/outlet';
import {
  EventPage,
  EventMapPage,
  EventSearchPage,
  EventScrapPage,
  EventDetailPage,
} from '@/pages';
import CommunityPage from '@/pages/community/page';
import UserPage from '@/pages/user/page';
import OnboardingPage from '@/pages/onboarding';
import PhoneNumberPage from '@/pages/auth/phone-number';
import CertifyPage from '@/pages/auth/certify';

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
          path: '/onboading',
          element: <OnboardingPage />,
        },
        {
          path: '/auth/phone-number',
          element: <PhoneNumberPage />,
        },
        {
          path: '/auth/certify',
          element: <CertifyPage />,
        },
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
