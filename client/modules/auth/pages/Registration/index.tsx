import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { AuthApi } from '../../auth.api';
import { registrationSteps } from '../../dto/auth.dto';
import { useAppSelector } from '../../../../hooks/useAppRedux';
import { RootState } from '../../../../services/app-store';
import { RegistrationData } from './registrationContext';
import { getCookie } from '../../../../services/helper';

import Tabs, { ITab } from '../../../../UI/components/Tabs';
import { IMultiSelectItem } from '../../../../UI/components/MultiSelect';
import Basic from './Steps/basic';
import Additional from './Steps/additional';
import Interests from './Steps/interests';
import Languages from './Steps/languages';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/registration.module.scss';

const Registration = () => {
  const user = useAppSelector(({ auth }: RootState) => auth.user);

  const [hobbies, setHobbies] = useState<IMultiSelectItem[]>([]);
  const [languages, setLanguages] = useState<IMultiSelectItem[]>([]);

  const [userPassword, setUserPassword] = useState<string>('');

  const [step, setStep] = useState<ITab['id']>(registrationSteps.basic);
  const [visibleTabs, setVisibleTabs] = useState({
    [registrationSteps.basic]: false,
    [registrationSteps.additional]: true,
    [registrationSteps.interests]: true,
    [registrationSteps.languages]: true,
  });

  const token: string | null = getCookie('access_token');

  const registerUser = async () => {
    try {
      if (token) {
        const removeEmptyFields = (obj: any) => {
          const newObj: any = {};
          for (const key in obj) {
            if (
              obj[key] !== null &&
              obj[key] !== undefined &&
              obj[key] !== ''
            ) {
              newObj[key] = obj[key];
            }
          }
          return newObj;
        };

        const filteredUser = {
          ...user,
          hobbies: user.hobbies.filter((hobby) => hobby !== ''),
          languages: user.languages.filter((language) => language !== ''),
        };

        const userData = await AuthApi.editUser(
          removeEmptyFields(filteredUser),
          token
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const steps: ITab[] = [
    {
      id: registrationSteps.basic,
      disabled: visibleTabs[registrationSteps.basic],
      content: (
        <Basic userPassword={userPassword} setUserPassword={setUserPassword} />
      ),
      title: 1,
      className: styles.step,
      onClick: () => setStep(registrationSteps.basic),
    },
    {
      id: registrationSteps.additional,
      disabled: visibleTabs[registrationSteps.additional],
      content: <Additional />,
      title: 2,
      className: styles.step,
      onClick: () => setStep(registrationSteps.additional),
    },
    {
      id: registrationSteps.interests,
      disabled: visibleTabs[registrationSteps.interests],
      content: <Interests hobbies={hobbies} />,
      title: 3,
      className: styles.step,
      onClick: () => setStep(registrationSteps.interests),
    },
    {
      id: registrationSteps.languages,
      disabled: visibleTabs[registrationSteps.languages],
      content: <Languages languages={languages} registerUser={registerUser} />,
      title: 4,
      className: styles.step,
      onClick: () => setStep(registrationSteps.languages),
    },
  ];

  const getLanguagesAndHobbies = (): void => {
    Promise.all([AuthApi.getLanguages(), AuthApi.getHobbies()])
      .then(([languagesResponse, hobbiesResponse]) => {
        const transformedLanguages = (languagesResponse as any[]).map(
          ({ _id: id, name }: any) => ({
            id,
            name,
          })
        );
        setLanguages(transformedLanguages);

        const transformedHobbies = (hobbiesResponse as any[]).map(
          ({ _id: id, name }: any) => ({
            id,
            name,
          })
        );
        setHobbies(transformedHobbies);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLanguagesAndHobbies();
  }, []);

  return (
    <RegistrationData.Provider value={{ setStep, setVisibleTabs }}>
      <motion.div
        className={styles.tab}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs
          options={steps}
          selectedTabId={step}
          listClasses={styles.steps}
          bodyClasses={styles.wrapper__tabs}
          tabsPanel={styles.wrapper__tabs_panel}
          headerContent={<div className={styles.bar}></div>}
        />

        <AnimatePresence>
          {user.email && user.firstName && (
            <motion.div
              className={auth.auth__footer}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p>Complete Your Profile Later</p>
              <Link href="/auth/login">Save and Finish Later</Link>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={auth.auth__footer}>
          <p>You already have an account?</p>
          <Link href="/auth/login">Log in!</Link>
        </div>
      </motion.div>
    </RegistrationData.Provider>
  );
};

export default Registration;
