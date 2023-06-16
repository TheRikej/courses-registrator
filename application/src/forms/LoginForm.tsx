import * as React from 'react';
import {useForm} from 'react-hook-form';
import {TextField, Button} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {Link} from "react-router-dom";

const schema = z.object({
  userName: z.string().nonempty("Please enter a name or email."),
  password: z.string(),
});

interface LoginForm {
    userNameEmail: string,
    password: string,
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    //TODO: login user
  };

  return (
    <form
      className="flex flex-col flex-start rounded border-solid border-2 m-2 lg:w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-poppins text-2xl mx-8 mt-6 mb-4 font-bold text-blue-950">
          Log in
      </h1>

      <TextField
          id="name"
          label="Username or email"
          variant="outlined"
          sx={{ margin: '0.5rem 2rem' }}
          {...register('userNameEmail')}
          error={errors.userNameEmail !== undefined}
          size="small"
          helperText={errors.userNameEmail?.message}
      />
      <TextField
          id="name"
          label="Password"
          variant="outlined"
          sx={{ margin: '0.5rem 2rem' }}
          size="small"
          type="password"
          {...register('password')}
          error={errors.password !== undefined}
          helperText={errors.password?.message}
      />

      <div className="flex flex-col content-center justify-center mx-auto">
        <Button color="success" className="w-52" type="submit" variant="outlined" sx={{ margin: '1rem 2rem' }}>
          Log in
        </Button>
        <Link to="/register">
            <Button color="info" className="w-52" type="submit" variant="outlined" sx={{ margin: '0 2rem' }}>
              Register new account
            </Button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
