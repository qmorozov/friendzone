import { FC, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/useAppRedux';
import { RootState } from '../../../../../services/app-store';
import { updateProfile } from '../../../store/auth';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';

interface ILanguages {
  registerUser: () => void;
  languages: IMultiSelectItem[];
}

const Languages: FC<ILanguages> = ({ languages, registerUser }) => {
  const dispatch = useAppDispatch();

  const { languages: languagesState } = useAppSelector(
    ({ auth }: RootState) => auth.user
  );

  const [hasSelection, setHasSelection] = useState<boolean>(true);

  const handleLanguages = (selectedLanguages: string[]): void => {
    setHasSelection(selectedLanguages.length > 0);

    dispatch(updateProfile({ languages: selectedLanguages }));
  };

  const handleContinue = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    languagesState.length > 0 ? registerUser() : setHasSelection(false);
  };

  return (
    <>
      <h1 className={auth.title}>Languages</h1>

      <form className={auth.form}>
        <div className={auth.formWrapper}>
          <MultiSelect
            options={languages}
            onSelect={handleLanguages}
            selectedIds={languagesState}
          />

          {!hasSelection && (
            <motion.span
              className="error-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              Please choose at least one option to continue.
            </motion.span>
          )}
        </div>

        <Button
          classes={auth.button}
          aria-label="SIGN UP!"
          onClick={handleContinue}
        >
          SIGN UP!
        </Button>
      </form>
    </>
  );
};

export default Languages;
