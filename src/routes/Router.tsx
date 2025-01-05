import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/layouts/Layout'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return children
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Layout />
      ),
      // errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <></>
            </ProtectedRoute>
          )
        },
        {
          path: '/auth/signup',
          // element: <SignUpPage />
        },
        {
          path: '/auth/signin',
          // element: <SignInPage />
        },
      ]
    }
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
