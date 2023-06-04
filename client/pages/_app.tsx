import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from '../services/app-store';
import type { AppProps } from 'next/app';
import AuthenticatedRoute from '../services/AuthenticatedRoute';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      <Provider store={store}>
        <AuthenticatedRoute>
          <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 0.75,
            }}
            variants={{
              initialState: {
                opacity: 0,
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
              },
              animateState: {
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              },
              exitState: {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              },
            }}
            style={{ background: '#000' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AuthenticatedRoute>
      </Provider>
    </AnimatePresence>
  );
}

export default MyApp;
