import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { HomePage } from '@/pages';
import InputComponentsPage from '@/pages/TestPage/InputComponentsPage';
import CalendarPage from '@/pages/TestPage/CalendarPage';
import { SearchBarPage } from '@/pages/TestPage/SearchBarPage';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
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
          element: <HomePage />,
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
    basename: import.meta.env.BASE_URL,
  },
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
