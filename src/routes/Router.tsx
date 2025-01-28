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
import GenderSelectionPage from '@/pages/auth/gender';
import PersonalDataPage from '@/pages/auth/personal-data';
import TosPage from '@/pages/auth/tos';
import PrivacyPage from '@/pages/auth/privacy';
import TermsLocationPage from '@/pages/auth/terms-location';
import CompletePage from '@/pages/auth/complete';
import EditPage from '@/pages/user/edit';
import NoticePage from '@/pages/user/notice';
import RequestPage from '@/pages/user/request';
import TouPage from '@/pages/user/tou';
import ManagePage from '@/pages/user/manage';
import ResignPage from '@/pages/user/resign';

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
          index: true,
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
          path: '/auth/gender',
          element: <GenderSelectionPage />,
        },
        {
          path: '/auth/personal-data',
          element: <PersonalDataPage />,
        },
        {
          path: '/auth/tos',
          element: <TosPage />,
        },
        {
          path: '/auth/privacy',
          element: <PrivacyPage />,
        },
        {
          path: '/auth/terms-location',
          element: <TermsLocationPage />,
        },
        {
          path: '/auth/complete',
          element: <CompletePage />,
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
        {
          path: '/user/edit',
          element: <EditPage />,
        },
        {
          path: '/auth/notice',
          element: <NoticePage />,
        },
        {
          path: '/auth/request',
          element: <RequestPage />,
        },
        {
          path: '/auth/tou',
          element: <TouPage />,
        },
        {
          path: '/auth/manage',
          element: <ManagePage />,
        },
        {
          path: '/auth/resign',
          element: <ResignPage />,
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
