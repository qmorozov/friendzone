import Link from 'next/link';

import Button from '../../../../UI/components/Button';
import Input from '../../../../UI/components/Input';

import auth from '../../styles/index.module.scss';
import login from '../../styles/pages/login.module.scss';

const ForgotPassword = () => {
  return (
    <div className={login.wrapper}>
      <h1 className={auth.title}>Reset your password</h1>

      <form>
        <Input label="Login" />
        <Input label="E-mail" />

        <Button classes={auth.button}>CONTINUE</Button>
      </form>

      <div className={auth.auth__footer}>
        <p>Go back to login screen</p>
        <Link href="/auth/login">login screen</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
