import { FC } from 'react';
import { motion } from 'framer-motion';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/useAppRedux';
import { RootState } from '../../../../../services/app-store';
import { updateProfile } from '../../../store/auth';

interface ILanguages {
  languages: IMultiSelectItem[];
}

const Languages: FC<ILanguages> = ({ languages }) => {
  const dispatch = useAppDispatch();

  const { languages: languagesState } = useAppSelector(
    ({ auth }: RootState) => auth.user
  );

  const handleLanguages = (languages: IMultiSelectItem[]): void => {
    dispatch(updateProfile({ languages }));
  };

  return (
    <>
      <h1 className={auth.title}>Languages</h1>

      <motion.form
        className={auth.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
        }}
      >
        <MultiSelect
          options={languages}
          onSelect={handleLanguages}
          selectedItems={languagesState}
        />

        <Button classes={auth.button} aria-label="Sign up">
          SIGN UP!
        </Button>
      </motion.form>
    </>
  );
};

export default Languages;
