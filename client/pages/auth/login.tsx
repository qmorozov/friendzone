import dynamic from 'next/dynamic';
import AuthLayout from '../../layouts/auth';

const AuthLoginPageContent = dynamic(
  () => import('../../modules/auth/pages/Login'),
  {
    ssr: false,
  }
);

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <AuthLoginPageContent />
    </AuthLayout>
  );
};

export default LoginPage;
