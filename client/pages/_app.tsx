import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from '../services/app-store';
import type { AppProps } from 'next/app';
import AuthenticatedRoute from '../services/AuthenticatedRoute';
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <AuthenticatedRoute>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            variants={{
              initialState: {
                opacity: 0,
                clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
                transition: {
                  duration: 1.4,
                },
              },
              animateState: {
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                transition: {
                  duration: 0.4,
                  delay: 0.5,
                },
              },
              exitState: {
                opacity: 0,
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                transition: {
                  duration: 0.4,
                },
              },
            }}
            exit="exitState"
            initial="initialState"
            animate="animateState"
            style={{ backgroundColor: '#000' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </AuthenticatedRoute>
    </Provider>
  );
}

export default MyApp;
