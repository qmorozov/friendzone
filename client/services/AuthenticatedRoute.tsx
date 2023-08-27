import { useRouter } from 'next/router';
import { useEffect, ReactNode, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { CookieValueTypes, getCookie } from 'cookies-next';
import { AuthApi } from '../modules/auth/auth.api';
import { setLoading, signIn, updateProfile } from '../modules/auth/store/auth';
import { RootState } from './app-store';

interface IAuthenticatedRoute {
  children: ReactNode;
}

const AuthenticatedRoute: FC<IAuthenticatedRoute> = ({ children }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);

  const accessToken: CookieValueTypes = getCookie('access_token');
  const allowedPathsForUnLogin: string[] = [
    '/auth/login',
    '/auth/registration',
    '/auth/forgot-password/[[...token]]',
  ];

  const getUserDataByToken = async (token: string): Promise<void> => {
    try {
      const {
        firstName,
        lastName,
        location,
        hobbies,
        email,
        languages,
        settings,
        pictures,
        socialMedia,
        username,
      }: any = await AuthApi.loginUserByToken(token);

      if (user?.email === '') {
        dispatch(
          updateProfile({
            firstName,
            lastName,
            email,
            location,
            hobbies,
            languages,
            settings,
            pictures,
            socialMedia,
            username,
          })
        );
      }
      dispatch(signIn());
    } catch (error) {
      console.log(error);
      if (!allowedPathsForUnLogin.includes(router.pathname)) {
        router.push('/auth/login');
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUserDataByToken(accessToken);
    } else {
      dispatch(setLoading(false));
      if (!allowedPathsForUnLogin.includes(router.pathname)) {
        router.push('/auth/login');
      }
    }
  }, [accessToken]);

  return (
    <>
      {children}
      <div
        style={{
          opacity: loading ? '1' : '0',
          visibility: loading ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
        }}
        className="loader"
      ></div>
    </>
  );
};

export default AuthenticatedRoute;
