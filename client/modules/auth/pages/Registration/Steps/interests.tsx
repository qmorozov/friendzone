import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/useAppRedux';
import { updateProfile } from '../../../store/auth';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';
import { RootState } from '../../../../../services/app-store';

interface IInterests {
  hobbies: IMultiSelectItem[];
}

const Interests: FC<IInterests> = ({ hobbies }) => {
  const dispatch = useAppDispatch();

  const { hobbies: hobbiesState } = useAppSelector(
    ({ auth }: RootState) => auth.user
  );

  const handleHobbies = (hobbies: IMultiSelectItem[]): void => {
    dispatch(updateProfile({ hobbies }));
  };

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
          onSelect={handleHobbies}
          selectedItems={hobbiesState}
        />

        <Button classes={auth.button} aria-label="Continue">
          CONTINUE
        </Button>
      </motion.form>
    </>
  );
};

export default Interests;
