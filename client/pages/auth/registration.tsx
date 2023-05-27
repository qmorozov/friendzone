import dynamic from 'next/dynamic';
import AuthLayout from '../../layouts/auth';

const AuthRegistrationPageContent = dynamic(
  () => import('../../modules/auth/pages/Registration'),
  {
    ssr: false,
  }
);

const RegistrationPage = () => {
  return (
    <AuthLayout title="Registration">
      <AuthRegistrationPageContent />
    </AuthLayout>
  );
};

export default RegistrationPage;
