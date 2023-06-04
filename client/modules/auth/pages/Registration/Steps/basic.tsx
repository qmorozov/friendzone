import { motion } from 'framer-motion';

import Button from '../../../../../UI/components/Button';
import Input from '../../../../../UI/components/Input';

import auth from '../../../styles/index.module.scss';

const Basic = () => {
  return (
    <>
      <h1 className={auth.title}>Basic information</h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
        }}
      >
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
      </motion.form>
    </>
  );
};

export default Basic;
