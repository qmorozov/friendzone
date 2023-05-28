import Button from '../../../../../UI/components/Button';
import Input from '../../../../../UI/components/Input';

import auth from '../../../styles/index.module.scss';

const Additional = () => {
  return (
    <>
      <h1 className={auth.title}>Additional information</h1>

      <form>
        <Input type="textarea" label="Bio" />

        <Input label="Social Media URL #1" />
        <Input label="Social Media URL #2" />
        <Input label="Social Media URL #3" />

        <Button classes={auth.button}>CONTINUE</Button>
      </form>
    </>
  );
};

export default Additional;
