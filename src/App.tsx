import { Suspense, useState } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary
} from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import Router from './routes/Router'
import GlobalStyles from '@/styles/GlobalStyles'
import '@/styles/fonts.css'
import '@/styles/designToken.css'

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false) // ReactQueryDevtoolsPanel 열고닫기

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (error instanceof APIResponseError) {
          if (error.body.code === "invalid_token") {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
          }
        }

        // 백그라운드 refetch error 처리 논의 필요
        if (query.state.data !== undefined) {
          alert(error); 
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles/>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={({error}) => <div>error fallback component: {error.message}</div>}
          >
            <Suspense fallback={<div>Loading Component</div>}>
              <Router />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }>{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
      {isOpen && (
        <ReactQueryDevtoolsPanel
          style={{ height: '200px' }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </QueryClientProvider>
  )
}

export default App