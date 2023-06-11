import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { registrationSteps } from '../../dto/auth.dto';

import Tabs, { ITab } from '../../../../UI/components/Tabs';
import { IMultiSelectItem } from '../../../../UI/components/MultiSelect';
import { AuthApi } from '../../auth.api';
import Basic from './Steps/basic';
import Additional from './Steps/additional';
import Interests from './Steps/interests';
import Languages from './Steps/languages';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/registration.module.scss';

const Registration = () => {
  const [hobbies, setHobbies] = useState<IMultiSelectItem[]>([]);
  const [languages, setLanguages] = useState<IMultiSelectItem[]>([]);

  const steps: ITab[] = [
    {
      id: registrationSteps.basic,
      content: <Basic />,
      title: 1,
      className: styles.step,
    },
    {
      id: registrationSteps.additional,
      content: <Additional />,
      title: 2,
      className: styles.step,
    },
    {
      id: registrationSteps.interests,
      content: <Interests hobbies={hobbies} />,
      title: 3,
      className: styles.step,
    },
    {
      id: registrationSteps.languages,
      content: <Languages languages={languages} />,
      title: 4,
      className: styles.step,
    },
  ];

  useEffect(() => {
    const getHobbies = (): void => {
      AuthApi.getHobbies()
        .then((response: any) => {
          const transformedOptions = response.map((item: any) => ({
            id: item._id,
            name: item.name,
          }));
          setHobbies(transformedOptions);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getLanguages = (): void => {
      AuthApi.getLanguages()
        .then((response: any) => {
          const transformedOptions = response.map((item: any) => ({
            id: item._id,
            name: item.name,
          }));
          setLanguages(transformedOptions);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getHobbies();
    getLanguages();
  }, []);

  return (
    <motion.div
      className={styles.tab}
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs
        options={steps}
        selectedTabId={steps[0].id}
        listClasses={styles.steps}
        bodyClasses={styles.wrapper__tabs}
        tabsPanel={styles.wrapper__tabs_panel}
        headerContent={<div className={styles.bar}></div>}
      />

      <div className={auth.auth__footer}>
        <p>You already have an account?</p>
        <Link href="/auth/login">Log in!</Link>
      </div>
    </motion.div>
  );
};

export default Registration;
