import { FC } from 'react';

import Button from '../../../../../UI/components/Button';
import MultiSelect, {
  IMultiSelectItem,
} from '../../../../../UI/components/MultiSelect';

import auth from '../../../styles/index.module.scss';

interface ILanguages {
  languages: IMultiSelectItem[];
}

const Languages: FC<ILanguages> = ({ languages }) => {
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
