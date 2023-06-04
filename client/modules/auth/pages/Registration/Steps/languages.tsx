import { useEffect, useState } from 'react';
import { AuthApi } from '../../../auth.api';

import { motion } from 'framer-motion';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';

const Languages = () => {
  const [languages, setLanguages] = useState<IMultiSelectItem[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <h1 className={auth.title}>Languages</h1>

      <form>
        <MultiSelect
          options={languages}
          onSelect={(value: IMultiSelectItem[]) => console.log(value)}
        />

        <Button classes={auth.button}>SIGN UP!</Button>
      </form>
    </>
  );
};

export default Languages;
