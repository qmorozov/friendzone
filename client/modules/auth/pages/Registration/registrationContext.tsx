import { createContext, useContext } from 'react';

import { ITab } from '../../../../UI/components/Tabs';

interface RegistrationContextData {
  setStep: (step: ITab['id']) => void;
  setVisibleTabs: (tabs: (prevState: any) => any) => void;
}

export const RegistrationData = createContext<RegistrationContextData | null>(
  null
);

export const useRegistrationData = () =>
  useContext(RegistrationData) as RegistrationContextData;
