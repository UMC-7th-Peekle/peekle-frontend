import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { EventPage, EventMapPage } from '@/pages';

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
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
