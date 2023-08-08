import { FC, ReactNode, useRef, useEffect } from 'react';
import DocumentHead from '../_head';

import styles from '../../styles/parts/authLayouts.module.scss';
import Tabs from '../../UI/components/Tabs';

export interface IAuthLayout {
  title: string;
  children: ReactNode;
}

const debounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let timer: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

const throttle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let lastCallTime = 0;
  return (...args: T) => {
    const now = new Date().getTime();
    if (now - lastCallTime >= delay) {
      callback(...args);
      lastCallTime = now;
    }
  };
};

const AuthLayout: FC<IAuthLayout> = ({ children, title }) => {
  const defaultTitle = 'Auth';
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const updateScrollPadding = (): void => {
    if (contentContainerRef.current) {
      const { scrollHeight, clientHeight } = contentContainerRef.current;
      const hasVerticalScroll = scrollHeight > clientHeight;

      if (hasVerticalScroll) {
        contentContainerRef.current.style.paddingTop = '3rem';
        contentContainerRef.current.style.paddingBottom = '3rem';
      } else {
        contentContainerRef.current.style.paddingTop = '0';
        contentContainerRef.current.style.paddingBottom = '0';
      }
    }
  };

  useEffect(() => {
    updateScrollPadding();

    const debouncedUpdateScrollPadding = debounce(updateScrollPadding, 50);
    const throttledUpdateScrollPadding = throttle(updateScrollPadding, 100);

    window.addEventListener('load', updateScrollPadding);
    window.addEventListener('resize', debouncedUpdateScrollPadding);

    const resizeObserver = new ResizeObserver(throttledUpdateScrollPadding);
    if (contentContainerRef.current) {
      resizeObserver.observe(contentContainerRef.current);
    }

    return () => {
      window.removeEventListener('load', updateScrollPadding);
      window.removeEventListener('resize', debouncedUpdateScrollPadding);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    updateScrollPadding();
  }, [children]);

  return (
    <section className={styles.auth}>
      <DocumentHead title={title || defaultTitle} />

      <div className={styles.auth__decor}>
        <img
          alt="Auth background image"
          src="/images/auth-bg.webp"
          className={styles.auth__background}
        />
      </div>

      <div className={styles.auth__content}>
        <div
          ref={contentContainerRef}
          className={styles.auth__content_container}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
