import Button from '../../../../../UI/components/Button';

import auth from '../../../styles/index.module.scss';

const Basic = () => {
  return (
    <>
      <h1 className={auth.title}>Basic information</h1>

      <form>
        <Button classes={auth.button}>CONTINUE</Button>
      </form>
    </>
  );
};

export default Basic;
