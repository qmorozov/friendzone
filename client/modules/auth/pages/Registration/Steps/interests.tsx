import { useEffect, useState } from 'react';
import { AuthApi } from '../../../auth.api';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';

const Interests = () => {
  const [hobbies, setHobbies] = useState<IMultiSelectItem[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <h1 className={auth.title}>Interests</h1>

      <form>
        <MultiSelect
          options={hobbies}
          onSelect={(value: IMultiSelectItem[]) => console.log(value)}
        />

        <Button classes={auth.button}>CONTINUE</Button>
      </form>
    </>
  );
};

export default Interests;
