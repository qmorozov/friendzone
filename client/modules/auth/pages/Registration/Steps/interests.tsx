import Button from '../../../../../UI/components/Button';

import auth from '../../../styles/index.module.scss';

const Interests = () => {
  return (
    <>
      <h1 className={auth.title}>Interests</h1>

      <form>
        <Button classes={auth.button}>CONTINUE</Button>
      </form>
    </>
  );
};

export default Interests;
