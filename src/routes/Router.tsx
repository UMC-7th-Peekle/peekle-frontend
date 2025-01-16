import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { HomePage } from '@/pages';
import ComponentsPage from '@/pages/TestPage/ComponentsPage';

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
          path: '/test/components',
          element: <ComponentsPage />,
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
