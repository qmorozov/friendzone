import Button from '../../../../../UI/components/Button';
import Input from '../../../../../UI/components/Input';

import auth from '../../../styles/index.module.scss';

const Basic = () => {
  return (
    <>
      <h1 className={auth.title}>Basic information</h1>

      <form>
        <Input label="Login" />
        <Input label="Email" />
        <fieldset>
          <Input label="Name" />
          <Input label="Surname" />
        </fieldset>
        <Input label="Password" type="password" />
        <fieldset>
          <Input label="City" />
          <Input label="Age" type="number" />
        </fieldset>

        <Button classes={auth.button}>CONTINUE</Button>
      </form>
    </>
  );
};

export default Basic;
