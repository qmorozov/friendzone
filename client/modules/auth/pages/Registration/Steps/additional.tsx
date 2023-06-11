import { motion } from 'framer-motion';

import Button from '../../../../../UI/components/Button';
import Input from '../../../../../UI/components/Input';

import auth from '../../../styles/index.module.scss';

const Additional = () => {
  return (
    <>
      <h1 className={auth.title}>Additional information</h1>

      <motion.form
        className={auth.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
        }}
      >
        <Input type="textarea" label="Bio" />

        <Input label="Social Media URL #1" />
        <Input label="Social Media URL #2" />
        <Input label="Social Media URL #3" />

        <Button classes={auth.button}>CONTINUE</Button>
      </motion.form>
    </>
  );
};

export default Additional;
