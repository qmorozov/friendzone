import { FC } from 'react';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';

interface IInterests {
  hobbies: IMultiSelectItem[];
}

const Interests: FC<IInterests> = ({ hobbies }) => {
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
