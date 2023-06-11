import { FC } from 'react';

import { motion } from 'framer-motion';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';

interface IInterests {
  hobbies: IMultiSelectItem[];
}

const Interests: FC<IInterests> = ({ hobbies }) => {
  return (
    <>
      <h1 className={auth.title}>Interests</h1>

      <motion.form
        className={auth.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
        }}
      >
        <MultiSelect
          options={hobbies}
          onSelect={(value: IMultiSelectItem[]) => console.log(value)}
        />

        <Button classes={auth.button}>CONTINUE</Button>
      </motion.form>
    </>
  );
};

export default Interests;
