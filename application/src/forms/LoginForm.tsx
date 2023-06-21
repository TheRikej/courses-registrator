import * as React from 'react';
import {useForm} from 'react-hook-form';
import {TextField, Button} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {Link} from "react-router-dom";
import { UserLoginModel } from '../services/models';
import { UserRequests } from '../services';
import { useMutation } from '@tanstack/react-query';
import {useRecoilState} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";

const schema = z.object({
  email: z.string().nonempty("Please enter email."),
  password: z.string(),
});

interface LoginForm {
    email: string,
    password: string,
}

const LoginForm = () => {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const { mutate: loginUser } = useMutation({
    mutationFn: async (info: {
        userInfo: UserLoginModel,
    }) => {
      const loggedUserData = UserRequests.loginUser(info.userInfo);
      const arrivedData = (await loggedUserData).data;
      setLoggedUser({ id: arrivedData.id, admin: arrivedData.administrator, 
        teacher: arrivedData.teacher, student: arrivedData.student, name: arrivedData.userName });
      return loggedUserData;
    }
  });

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    loginUser({
      userInfo: {
        email: values.email,
        password: values.password,
      }
    });
  };

  if (loggedUser !== null) {
    return <Link to={"/register"}></Link>
  }

  return (
    <form
      className="flex flex-col flex-start rounded border-solid border-2 m-2 lg:w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-poppins text-2xl mx-8 mt-6 mb-4 font-bold text-blue-950">
          Log in
      </h1>

      <TextField
          id="email"
          label="Email"
          variant="outlined"
          sx={{ margin: '0.5rem 2rem' }}
          {...register('email')}
          error={errors.email !== undefined}
          size="small"
          helperText={errors.email?.message}
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
