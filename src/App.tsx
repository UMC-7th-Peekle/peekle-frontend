import { Suspense } from 'react';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
// import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'; // 디버깅용
import { ErrorBoundary } from 'react-error-boundary';
import queryClient from './lib/tanstack-query/queryClient';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/fonts.css';
import {
  DeferredLoader,
  ErrorFallback,
  MetaTag,
  Alert,
  Confirm,
  Toast,
} from './components';
import Router from '@/routes/Router';

function App() {
  // const [isOpen, setIsOpen] = useState<boolean>(false); // ReactQueryDevtoolsPanel 열고닫기

  return (
    <ThemeProvider theme={theme}>
      <MetaTag />
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <Suspense fallback={<DeferredLoader />}>
                <Alert />
                <Confirm />
                <Toast />
                <Router />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
        >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
        {isOpen && (
          <ReactQueryDevtoolsPanel
            style={{ height: '200px' }}
            onClose={() => setIsOpen(false)}
          />
        )} */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
