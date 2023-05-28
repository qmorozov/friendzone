import Button from '../../../../../UI/components/Button';

import auth from '../../../styles/index.module.scss';

const Languages = () => {
  return (
    <>
      <h1 className={auth.title}>Languages</h1>

      <form>
        <Button classes={auth.button}>SIGN UP!</Button>
      </form>
    </>
  );
};

export default Languages;
