import dynamic from 'next/dynamic';
import AuthLayout from '../../layouts/auth';

const AuthForgotPasswordPageContent = dynamic(
  () => import('../../modules/auth/pages/ForgotPassword'),
  {
    ssr: false,
  }
);

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Forgot password">
      <AuthForgotPasswordPageContent />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
