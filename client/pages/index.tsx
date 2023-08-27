import { useAppSelector } from '../hooks/useAppRedux';
import { RootState } from '../services/app-store';

const MainPage = () => {
  const user = useAppSelector(({ auth }: RootState) => auth.user);

  return (
    <>
      <div>First name: {user.firstName}</div>
      <div>Last name: {user.lastName}</div>
      <div>Email: {user.email}</div>
    </>
  );
};

export default MainPage;
