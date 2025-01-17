import { Suspense, useState } from 'react';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'; // 디버깅용
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { ErrorBoundary } from 'react-error-boundary';
import queryClient from './lib/tanstack-query/queryClient';
import { DeferredLoader, ErrorFallback } from './components';
import Router from './routes/Router';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/fonts.css';
import { Alert, Confirm } from '@/components';
function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false); // ReactQueryDevtoolsPanel 열고 닫기

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <NuqsAdapter>
                <Suspense fallback={<DeferredLoader />}>
                  <Alert />
                  <Confirm />
                  <Router />
                </Suspense>
              </NuqsAdapter>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <button
          onClick={() => setIsOpen(!isOpen)}
        >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
        {isOpen && (
          <ReactQueryDevtoolsPanel
            style={{ height: '200px' }}
            onClose={() => setIsOpen(false)}
          />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
