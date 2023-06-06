import { FC, ReactNode, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

export interface ITab {
  id: string;
  className?: string;
  content: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  title: string | ReactNode;
}

export interface ITabs {
  options: ITab[];
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
}) => {
  const [selectedTab, setSelectedTab] = useState(selectedTabId);

  useEffect(() => {
    if (selectedTabId !== selectedTab) {
      setSelectedTab(selectedTabId);
    }
  }, [selectedTabId]);

  const handleTabChange = (index: number): void => {
    const selectedTabId = options[index].id;
    setSelectedTab(selectedTabId);
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
            ({ title, id, disabled = false, onClick, className }) => (
              <Tab
                key={id}
                disabled={disabled}
                onClick={() => {
                  if (onClick) {
                    onClick();
                  }

                  setSelectedTab(id);
                }}
                className={className}
              >
                {title}
              </Tab>
            )
          )}
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
