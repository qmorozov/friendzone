import { FC, ReactNode, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

export interface ITab {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ITabs {
  options: ITab[];
  classes?: string;
  selectedTabId?: ITab['id'];
}

const Tabs: FC<ITabs> = ({ options, selectedTabId, classes }) => {
  const [selectedTab, setSelectedTab] = useState(selectedTabId);

  useEffect(() => {
    if (selectedTabId !== selectedTab) {
      setSelectedTab(selectedTabId);
    }
  }, [selectedTabId]);

  const handleTabChange = (index: number) => {
    const selectedTabId = options[index].id;
    setSelectedTab(selectedTabId);
  };

  return (
    <div className={classes ? classes : ''}>
      <Tab.Group
        selectedIndex={options.findIndex(({ id }) => id === selectedTab)}
        onChange={handleTabChange}
      >
        <Tab.List>
          {options.map(({ title, id, disabled = false, onClick }) => (
            <Tab
              key={id}
              disabled={disabled}
              onClick={() => {
                if (onClick) {
                  onClick();
                }

                setSelectedTab(id);
              }}
            >
              {title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {options.map(({ id, content }) => (
            <Tab.Panel key={id}>{content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
