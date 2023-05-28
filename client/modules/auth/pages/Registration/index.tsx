import Link from 'next/link';

import Tabs, { ITab } from '../../../../UI/components/Tabs';
import Basic from './Steps/basic';
import Additional from './Steps/additional';
import Interests from './Steps/interests';
import Languages from './Steps/languages';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/registration.module.scss';

enum registrationSteps {
  basic = 'Basic',
  additional = 'Additional',
  interests = 'Interests',
  languages = 'Languages',
}

const Registration = () => {
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
      content: <Interests />,
      title: 3,
      className: styles.step,
    },
    {
      id: registrationSteps.languages,
      content: <Languages />,
      title: 4,
      className: styles.step,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Tabs
        options={steps}
        selectedTabId={steps[0].id}
        listClasses={styles.steps}
        headerContent={<div className={styles.bar}></div>}
      />

      <div className={auth.auth__footer}>
        <p>You already have an account?</p>
        <Link href="/auth/login">Log in!</Link>
      </div>
    </div>
  );
};

export default Registration;
