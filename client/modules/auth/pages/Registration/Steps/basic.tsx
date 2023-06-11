import { motion } from 'framer-motion';

import Button from '../../../../../UI/components/Button';
import Input from '../../../../../UI/components/Input';

import auth from '../../../styles/index.module.scss';
import { useForm } from 'react-hook-form';

enum Field {
  Age = 'age',
  Name = 'name',
  City = 'city',
  Login = 'login',
  Email = 'email',
  Password = 'password',
  LastName = 'lastName',
}

const Basic = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h1 className={auth.title}>Basic information</h1>

      <motion.form
        className={auth.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
        }}
      >
        <Input
          label="Login"
          error={errors[Field.Login]?.message}
          {...register(Field.Login, {
            required: 'This field is required',
          })}
        />
        <Input
          label="Email"
          error={errors[Field.Email]?.message}
          {...register(Field.Email, {
            required: 'This field is required',
          })}
        />
        <fieldset>
          <Input
            label="Name"
            error={errors[Field.Name]?.message}
            {...register(Field.Name, {
              required: 'This field is required',
            })}
          />
          <Input
            label="Last name"
            error={errors[Field.LastName]?.message}
            {...register(Field.LastName, {
              required: 'This field is required',
            })}
          />
        </fieldset>
        <Input
          label="Password"
          type="password"
          error={errors[Field.Password]?.message}
          {...register(Field.Password, {
            required: 'This field is required',
          })}
        />
        <fieldset>
          <Input
            label="City"
            error={errors[Field.City]?.message}
            {...register(Field.City, {
              required: 'This field is required',
            })}
          />
          <Input
            label="Age"
            type="number"
            error={errors[Field.Age]?.message}
            {...register(Field.Age, {
              required: 'This field is required',
            })}
          />
        </fieldset>

        <Button classes={auth.button}>CONTINUE</Button>
      </motion.form>
    </>
  );
};

export default Basic;
