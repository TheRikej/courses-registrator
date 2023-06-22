import * as React from 'react';
import {useForm} from 'react-hook-form';
import {TextField, Button} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {Link} from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { UserCreateModel } from '../services/models';
import { UserRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";

const schema = z.object({
  userName: z.string().nonempty("Name is required."),
  email: z.string({required_error: "Email is required."})
      .email("This is not a valid email."),
  password: z.string().min(8, "Your password must have at least 8 characters" +
      ", one number and one capital letter."),
}).refine((data) => /[0-9]/.test(data.password), {
    message: "Your password must have at least 8 characters" +
        ", one number and one capital letter.",
    path: ["password"],
}).refine((data) => /[A-Z]/.test(data.password), {
    message: "Your password must have at least 8 characters" +
        ", one number and one capital letter.",
    path: ["password"],
});

interface RegisterForm {
    userName: string,
    email: string,
    password: string,
}

const RegisterForm = () => {
  const loggedUser = useRecoilValue(loggedUserAtom);
  if (loggedUser !== null) {
    return <h1>Please log out first.</h1>;
  }

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const { mutate: createUser } = useMutation({
    mutationFn: (info: {
        userInfo: UserCreateModel,
    }) => UserRequests.createUser(
        info.userInfo
    ),
  });

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    createUser({
      userInfo: {
        email: values.email,
        userName: values.userName,
        password: values.password,
      }
    });
    reset()
  };

  return (
    <form
      className="flex flex-col flex-start rounded border-solid border-2 m-2 lg:w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-poppins text-2xl mx-8 mt-6 mb-4 font-bold text-blue-950">
          Register
      </h1>

      <TextField
          id="name"
          label="Name and surname *"
          variant="outlined"
          sx={{ margin: '0.5rem 2rem' }}
          {...register('userName')}
          error={errors.userName !== undefined}
          size="small"
          helperText={errors.userName?.message}
      />
      <TextField
          id="email"
          label="E-mail *"
          sx={{ margin: '0.5rem 2rem' }}
          {...register('email')}
          error={errors.email !== undefined}
          size="small"
          helperText={errors.email?.message}
          type="email"
      />
      <TextField
          id="name"
          label="Password *"
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
          Register
        </Button>
        <Link to="/login">
            <Button color="info" className="w-52" type="submit" variant="outlined" sx={{ margin: '0 2rem' }}>
              Back to login
            </Button>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
