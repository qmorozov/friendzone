import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { AuthApi } from '../../auth.api';
import { RegistrationSteps } from '../../dto/auth.dto';
import { useAppSelector } from '../../../../hooks/useAppRedux';
import { RootState } from '../../../../services/app-store';
import { RegistrationData } from './registrationContext';
import { CookieValueTypes, getCookie } from 'cookies-next';

import Tabs, { ITab } from '../../../../UI/components/Tabs';
import { IMultiSelectItem } from '../../../../UI/components/MultiSelect';
import Basic from './Steps/basic';
import Additional from './Steps/additional';
import Interests from './Steps/interests';
import Languages from './Steps/languages';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/registration.module.scss';
import authLayouts from '../../../../styles/parts/authLayouts.module.scss';

const Registration = () => {
  const user = useAppSelector(({ auth }: RootState) => auth.user);

  const [hobbies, setHobbies] = useState<IMultiSelectItem[]>([]);
  const [languages, setLanguages] = useState<IMultiSelectItem[]>([]);

  const [userPassword, setUserPassword] = useState<string>('');

  const [step, setStep] = useState<ITab['id']>(RegistrationSteps.basic);
  const [visibleTabs, setVisibleTabs] = useState({
    [RegistrationSteps.basic]: false,
    [RegistrationSteps.additional]: true,
    [RegistrationSteps.interests]: true,
    [RegistrationSteps.languages]: true,
  });

  const token: CookieValueTypes = getCookie('access_token');

  const registerUser = async (): Promise<void> => {
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
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.email && user.firstName) {
      registerUser();
    }
  }, [user]);

  const steps: ITab[] = [
    {
      id: RegistrationSteps.basic,
      disabled: visibleTabs[RegistrationSteps.basic],
      content: (
        <Basic userPassword={userPassword} setUserPassword={setUserPassword} />
      ),
      title: 1,
      className: styles.step,
      onClick: () => setStep(RegistrationSteps.basic),
    },
    {
      id: RegistrationSteps.additional,
      disabled: visibleTabs[RegistrationSteps.additional],
      content: <Additional />,
      title: 2,
      className: styles.step,
      onClick: () => setStep(RegistrationSteps.additional),
    },
    {
      id: RegistrationSteps.interests,
      disabled: visibleTabs[RegistrationSteps.interests],
      content: <Interests hobbies={hobbies} />,
      title: 3,
      className: styles.step,
      onClick: () => setStep(RegistrationSteps.interests),
    },
    {
      id: RegistrationSteps.languages,
      disabled: visibleTabs[RegistrationSteps.languages],
      content: <Languages languages={languages} registerUser={registerUser} />,
      title: 4,
      className: styles.step,
      onClick: () => setStep(RegistrationSteps.languages),
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.75,
        }}
      >
        <div className={authLayouts.auth__content_image}>
          <img src="/images/big-logo.svg" alt="logo" />
        </div>
        <div className={styles.tab}>
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
                <button onClick={registerUser}>Save and Finish Later</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={auth.auth__footer}>
            <p>You already have an account?</p>
            <Link href="/auth/login">Log in!</Link>
          </div>
        </div>
      </motion.div>
    </RegistrationData.Provider>
  );
};

export default Registration;
