import {
  createBrowserRouter,
  Navigate,
  useLocation,
  RouterProvider,
} from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import Layout from '@/layouts/outlet';
import {
  EventPage,
  EventMapPage,
  EventSearchPage,
  EventScrapPage,
  EventDetailPage,
  EventDetailPageskeleton,
  EventCreatePage,
  EventEditPage,
  CommunityEditPage,
  CommunityDetailPage,
  OnboardingPage,
  GenderSelectionPage,
  CommunityLikePage,
  CommunityPage,
  CommunitySearchPage,
  AdminPage,
  AdminSearchPage,
  AuthorizeRolePage,
  CreateRolePage,
  UnAuthorizeRolePage,
  NotFoundPage,
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
import ResignPage from '@/pages/user/resign';
import TossPage from '@/pages/auth/toss';
import RequestPage from '@/pages/user/request';
import { ErrorFallback, DeferredLoader } from '@/components';
import { ROUTES, ADMIN_PATHS } from '@/constants/routes';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isAdmin = true; // 임시 변수

  const adminCheck = useMemo(() => {
    const isAdminRoute = ADMIN_PATHS.includes(
      pathname as (typeof ADMIN_PATHS)[number],
    );
    return { isAdminRoute };
  }, [pathname]);

  // 관리자가 아닌데 관리자 path에 접근시 메인페이지로 이동
  if (!isAdmin && adminCheck.isAdminRoute) {
    return <Navigate to={'/'} replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <OnboardingPage />,
      },
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
        path: ROUTES.EVENT,
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
        element: (
          <Suspense fallback={<EventDetailPageskeleton />}>
            <EventDetailPage isAdmin={false} />
          </Suspense>
        ),
      },
      {
        path: ROUTES.EVENT_DETAIL_ADMIN,
        element: (
          <Suspense fallback={<EventDetailPageskeleton />}>
            <EventDetailPage isAdmin={true} />
          </Suspense>
        ),
      },
      {
        path: ROUTES.COMMUNITY,
        element: <CommunityPage />,
      },
      {
        path: ROUTES.COMMUNITY_EDIT,
        element: <CommunityEditPage />,
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
    path: ROUTES.ADMIN,
    element: (
      <ProtectedPage>
        <Layout />
      </ProtectedPage>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: ROUTES.EVENT_CREATE,
        element: <EventCreatePage />,
      },
      {
        path: ROUTES.EVENT_EDIT_ID,
        element: (
          <Suspense fallback={<DeferredLoader />}>
            <EventEditPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ADMIN_SEARCH,
        element: <AdminSearchPage />,
      },
      {
        path: ROUTES.AUTHORIZE_ROLE,
        element: <AuthorizeRolePage />,
      },
      {
        path: ROUTES.CREATE_ROLE,
        element: <CreateRolePage />,
      },
      {
        path: ROUTES.UNAUTHORIZE_ROLE,
        element: <UnAuthorizeRolePage />,
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
