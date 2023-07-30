import { useState, ChangeEvent, FC, useEffect } from 'react';
import { motion } from 'framer-motion';

import FormControl from '../FormControl';
import styles from './index.module.scss';

export interface IMultiSelectItem {
  id: string;
  name: string;
}

export interface IMultiSelect {
  selectedIds?: string[];
  options: IMultiSelectItem[];
  onSelect: (selectedItems: string[]) => void;
}

const MultiSelect: FC<IMultiSelect> = ({
  options,
  onSelect,
  selectedIds: initialSelectedIds,
}) => {
  const defaultSelectedItems: IMultiSelectItem[] = [];

  const [selectedItems, setSelectedItems] =
    useState<IMultiSelectItem[]>(defaultSelectedItems);

  useEffect(() => {
    if (initialSelectedIds) {
      const initialSelectedItems = options.filter(({ id }) =>
        initialSelectedIds.includes(id)
      );
      setSelectedItems(initialSelectedItems);
    }
  }, [initialSelectedIds, options]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    option: IMultiSelectItem
  ): void => {
    const isChecked = event.target.checked;
    let updatedSelectedItems: IMultiSelectItem[];

    if (isChecked) {
      updatedSelectedItems = [...selectedItems, option];
    } else {
      updatedSelectedItems = selectedItems.filter(({ id }) => id !== option.id);
    }

    setSelectedItems(updatedSelectedItems);

    const selectedIds = updatedSelectedItems.map(({ id }) => id);
    onSelect(selectedIds);
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
    >
      {options.map((option: IMultiSelectItem) => (
        <FormControl key={option.id} type="checkbox" label={option.name}>
          <input
            id={option.id}
            type="checkbox"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleCheckboxChange(event, option)
            }
            checked={selectedItems.some(({ id }) => id === option.id)}
          />
        </FormControl>
      ))}
    </motion.div>
  );
};

export default MultiSelect;
