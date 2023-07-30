import { FC, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/useAppRedux';
import { updateProfile } from '../../../store/auth';
import { RootState } from '../../../../../services/app-store';
import { useRegistrationData } from '../registrationContext';
import { registrationSteps } from '../../../dto/auth.dto';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';

interface IInterests {
  hobbies: IMultiSelectItem[];
}

const Interests: FC<IInterests> = ({ hobbies }) => {
  const dispatch = useAppDispatch();

  const { setStep, setVisibleTabs } = useRegistrationData();

  const { hobbies: hobbiesState } = useAppSelector(
    ({ auth }: RootState) => auth.user
  );

  const [hasSelection, setHasSelection] = useState<boolean>(true);

  const handleHobbies = (selectedHobbies: string[]): void => {
    setHasSelection(selectedHobbies.length > 0);

    dispatch(updateProfile({ hobbies: selectedHobbies }));
  };

  const handleContinue = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (hobbiesState.length > 0) {
      setStep(registrationSteps.languages);
      setVisibleTabs((prevState: any) => ({
        ...prevState,
        [registrationSteps.languages]: false,
      }));
    } else {
      setHasSelection(false);
    }
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
        <div className={auth.formWrapper}>
          <MultiSelect
            options={hobbies}
            onSelect={handleHobbies}
            selectedIds={hobbiesState}
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
          aria-label="Continue"
          onClick={handleContinue}
        >
          CONTINUE
        </Button>
      </motion.form>
    </>
  );
};

export default Interests;
