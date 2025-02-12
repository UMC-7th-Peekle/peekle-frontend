import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layouts/outlet';
import {
  EventPage,
  EventMapPage,
  EventSearchPage,
  EventScrapPage,
  EventDetailPage,
  NotFoundPage,
  CommunityEditPage,
  CommunityDetailPage,
  OnboardingPage,
  GenderSelectionPage,
} from '@/pages';
import UserPage from '@/pages/user/page';
import PhoneNumberPage from '@/pages/auth/phone-number';
import CertifyPage from '@/pages/auth/certify';
import PersonalDataPage from '@/pages/auth/personal-data';
import TosPage from '@/pages/auth/tos';
import PrivacyPage from '@/pages/auth/privacy';
import TermsLocationPage from '@/pages/auth/terms-location';
import CompletePage from '@/pages/auth/complete';
import SleeperPage from '@/pages/auth/sleeper';
import EditPage from '@/pages/user/edit';
import NoticePage from '@/pages/user/notice';
import TouPage from '@/pages/user/tou';
import ManagePage from '@/pages/user/manage';
import { ROUTES } from '@/constants/routes';
import { CommunityLikePage, CommunityPage, CommunitySearchPage } from '@/pages';
import { ErrorFallback } from '@/components';
import ResignPage from '@/pages/user/resign';
import TossPage from '@/pages/auth/toss';
import RequestPage from '@/pages/user/request';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const router = createBrowserRouter([
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
        path: ROUTES.ONBOARDING,
        element: <OnboardingPage />,
      },
      {
        path: ROUTES.AUTH_PHONE_NUMBER,
        element: <PhoneNumberPage />,
      },
      {
        path: '/auth/certify',
        element: <CertifyPage />,
      },
      {
        path: ROUTES.AUTH_GENDER,
        element: <GenderSelectionPage />,
      },
      {
        path: ROUTES.AUTH_PERSONAL_DATA,
        element: <PersonalDataPage />,
      },
      {
        path: '/auth/tos',
        element: <TosPage />,
      },
      {
        path: '/auth/toss',
        element: <TossPage />,
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
        path: '/auth/sleeper',
        element: <SleeperPage />,
      },
      {
        path: '/event',
        element: <EventPage />,
      },
      {
        path: ROUTES.EVENT_MAP,
        element: <EventMapPage />,
      },
      {
        path: ROUTES.EVENT_SEARCH,
        element: <EventSearchPage />,
      },
      {
        path: ROUTES.EVENT_SCRAP,
        element: <EventScrapPage />,
      },
      {
        path: ROUTES.EVENT_DETAIL,
        element: <EventDetailPage />,
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
        path: ROUTES.COMMUNITY_EDIT,
        element: <CommunityEditPage />,
      },
      {
        path: ROUTES.USER,
        element: <UserPage />,
      },
      {
        path: '/user/edit',
        element: <EditPage />,
      },
      {
        path: '/user/notice',
        element: <NoticePage />,
      },
      {
        path: '/user/request',
        element: <RequestPage />,
      },
      {
        path: '/user/tou',
        element: <TouPage />,
      },
      {
        path: '/user/manage',
        element: <ManagePage />,
      },
      {
        path: '/user/resign',
        element: <ResignPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />, // 404는 라우트로 처리
      },
    ],
  },
  {
    path: ROUTES.COMMUNITY_DETAIL,
    element: <CommunityDetailPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
