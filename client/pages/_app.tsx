import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from '../services/app-store';
import type { AppProps } from 'next/app';
import AuthenticatedRoute from '../services/AuthenticatedRoute';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthenticatedRoute>
        <Component {...pageProps} />
      </AuthenticatedRoute>
    </Provider>
  );
}

export default MyApp;
