import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { RegistrationData } from '../../../modules/auth/pages/Registration/registrationContext';

export interface ITab {
  id: string;
  className?: string;
  content: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  title: string | ReactNode;
}

export interface ITabs {
  options: ITab[];
  tabsPanel?: string;
  bodyClasses?: string;
  listClasses?: string;
  headerContent?: ReactNode;
  selectedTabId?: ITab['id'];
}

const Tabs: FC<ITabs> = ({
  options,
  selectedTabId,
  bodyClasses,
  listClasses,
  headerContent,
  tabsPanel,
}) => {
  const [selectedTab, setSelectedTab] = useState(selectedTabId);
  const [previousTabStack, setPreviousTabStack] = useState<string[]>([]);

  useEffect(() => {
    if (selectedTabId !== selectedTab) {
      setSelectedTab(selectedTabId);
    }
  }, [selectedTabId]);

  const handleTabChange = (index: number) => {
    const selectedTabId = options[index].id;

    const previousTabId = selectedTab || '';
    const previousTab = options.find((tab: ITab) => tab.id === previousTabId);
    if (previousTab && previousTab.onRemove) {
      previousTab.onRemove();
    }

    setSelectedTab(selectedTabId);
    setPreviousTabStack((prevStack: string[]) => [...prevStack, previousTabId]);
  };

  const handleTabRemove = (index: number) => {
    const removedTabId = options[index].id;
    const newTabStack = previousTabStack.filter(
      (tabId) => tabId !== removedTabId
    );
    setPreviousTabStack(newTabStack);
  };

  return (
    <div className={bodyClasses ?? bodyClasses}>
      <Tab.Group
        selectedIndex={options.findIndex(({ id }) => id === selectedTab)}
        onChange={handleTabChange}
      >
        <Tab.List className={listClasses ?? listClasses}>
          {headerContent}
          {options.map(
            ({ title, id, disabled = false, onClick, className }, index) => (
              <Tab
                key={id}
                disabled={disabled}
                onClick={() => {
                  if (onClick) {
                    onClick();
                  }

                  setSelectedTab(id);
                  handleTabRemove(index);
                }}
                className={className}
              >
                {title}
              </Tab>
            )
          )}
        </Tab.List>
        <Tab.Panels className={tabsPanel ?? tabsPanel}>
          {options.map(({ id, content }) => (
            <Tab.Panel key={id}>{content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
