import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import { useAppSelector } from '../hooks/useAppRedux';

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const router = useRouter();
  const isLogin = useAppSelector((state) => state.auth.signed);
  const allowedPaths = [
    '/auth/login',
    '/auth/registration',
    '/auth/forgot-password',
  ];

  useEffect(() => {
    const currentPath = router.pathname;

    if (!isLogin && !allowedPaths.includes(currentPath)) {
      router.push('/auth/login');
    }
  }, [isLogin, router.pathname]);

  return <>{children}</>;
};

export default AuthenticatedRoute;
