import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextField, Button, MenuItem, FormHelperText} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select from 'react-select';
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import { useMutation, useQuery } from '@tanstack/react-query';
import { CourseModel } from '../services/models';
import { FacultyRequests, UserRequests, CourseRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import NotAuthorized from "../components/NotAuthorized";

const schema = z.object({
  name: z.string().nonempty('Name is required.').max(40, "Name cannot be longer than 40 characters."),
  code: z.string().nonempty('Code is required.').max(8, "Code cannot be longer than 8 characters."),
  description: z.string(),
  faculty: z.string().nonempty('Faculty is required.'),
  credits: z.number().min(0, "Number of credits must be at least 0.")
      .max(30, "Number of credits cannot be greater than 30."),
  guarantor: z.number({required_error: "Guarantor is required."}),
});

interface CourseForm {
  name: string,
  code: string,
  description: string,
  faculty: string,
  credits: number,
  guarantor: number,
}

const CourseForm = (props: {isEdit: boolean}) => {
  const loggedUser = useRecoilValue(loggedUserAtom);
  if (loggedUser === null) {
    return <Navigate to="/login"/>;
  }
  if (!loggedUser.admin && !loggedUser.teacher) {
    return <NotAuthorized/>;
  }

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(schema),
  });
  const { code } = useParams();

  const { state } = useLocation();

  const { data: faculties } = useQuery({
    queryKey: ['courseFaculties'],
    queryFn: () => FacultyRequests.getFaculties(),
  });

  //TODO: set the logged in user as the default value in guarantor input
  const { data: usersQuery } = useQuery({
    queryKey: ['courseUsers'],
    queryFn: () => UserRequests.getUsers(),
  })

  const users = usersQuery?.data.map(x => ({value: x.id, label: x.userName}));

  const { mutate: updateCourse } = useMutation({
    mutationFn: (info: {
        courseInfo: CourseModel,
    }) => CourseRequests.updateCourse(
        info.courseInfo
    ),
});

  const { mutate: createCourse } = useMutation({
    mutationFn: (info: {
        courseInfo: CourseModel,
    }) => CourseRequests.createCourse(
        info.courseInfo
    ),
  });


  const onSubmit = () => {
    const values = getValues();
    if (!props.isEdit) {
      createCourse({
        courseInfo: {
          id: values.code,
          name: values.name,
          description: values.description,
          facultyId: values.faculty,
          credits: values.credits,
          guarantorId: values.guarantor,
        }
      });
    } else {
      updateCourse({
        courseInfo: {
          id: values.code,
          name: values.name,
          description: values.description,
          facultyId: values.faculty,
          credits: values.credits,
          guarantorId: values.guarantor,
        }
      });
    }
    reset();
  };

  if(users === undefined) {
    return <></>
  }

  if (!users) return <>Loading...</>;

  return (
      <form
          className="flex flex-col flex-start rounded border-solid border-2
                overflow-y-scroll max-h-screen overflow-x-hidden m-2"
          onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-poppins text-2xl m-6 font-bold text-blue-950">
          {props.isEdit ? ("Edit course " + code) : "Create new course"}
        </h1>

        <TextField
            id="code"
            label="Code *"
            className="w-28"
            sx={{ margin: '0 1rem 0.5rem' }}
            {...register('code')}
            error={errors.code !== undefined}
            size="small"
            defaultValue = {props.isEdit ? state.id : null}
            helperText={errors.code?.message}
        />
        <TextField
            id="name"
            label="Name *"
            className="w-auto lg:w-96"
            sx={{ margin: '0.5rem 1rem' }}
            {...register('name')}
            error={errors.name !== undefined}
            size="small"
            defaultValue = {props.isEdit ? state.course.name : null}
            multiline
            helperText={errors.name?.message}
        />

        <TextField
            id="description"
            label="Description"
            multiline
            minRows={2}
            sx={{ margin: '0.5rem 1rem' }}
            {...register('description')}
            error={errors.description !== undefined}
            size="small"
            defaultValue = {props.isEdit ? state.course.description : null}
            helperText={errors.description?.message}
        />

        <div className="mx-4 my-2 w-auto lg:w-96">
          <TextField
              id="faculty"
              label="Faculty *"
              select
              fullWidth
              size="small"
              defaultValue = ""
              inputProps={register('faculty')}
              error={errors.faculty !== undefined}
              helperText={errors.faculty?.message}
          >
            {faculties?.data.map((option) => (
                <MenuItem
                    key={option.name}
                    value={option.id}
                >
                  {option.name}
                </MenuItem>
            ))}
          </TextField>
        </div>

        <TextField
            id="credits"
            className="w-auto lg:w-28"
            label="Credits *"
            variant="outlined"
            sx={{ margin: '0.5rem 1rem' }}
            {...register('credits', { valueAsNumber: true })}
            error={errors.credits !== undefined}
            size="small"
            helperText={errors.credits?.message}
            type="number"
            defaultValue = {props.isEdit ? state.course.credits : 5}
            InputProps={{
              inputProps: {
                min: 0,
                max: 30,
              },
            }}
        />

        <label htmlFor={"guarantor"} className="mx-4 text-sm">Guarantor *</label>
        <Controller
            control={control}
            name="guarantor"
            render={({ field, }) => (
                <Select
                    ref={field.ref}
                    value={users.find(c => c.value === field.value)}
                    onChange={val => field.onChange(val?.value)}
                    className="w-auto lg:w-96 mx-4 mb-1"
                    isClearable={true}
                    isSearchable={true}
                    id="guarantor"
                    name="guarantor"
                    options={users}
                />
            )}
        />
        <FormHelperText error sx={{ margin: '0rem 1.5rem' }}>
          {errors.guarantor?.message}
        </FormHelperText>

        <div className="flex flex-col content-center justify-center m-auto">
          <Button color="success" className="w-52" type="submit" variant="outlined" sx={{ margin: '1rem 2rem' }}>
            {props.isEdit ? "Submit" : "Create"}
          </Button>
          <Link to={props.isEdit ? ("/courses/"+code+"/show") : "/"}>
            <Button color="error" className="w-52" type="submit" variant="outlined" sx={{ margin: '0 2rem 4rem' }}>
              Back to {props.isEdit ? code : "courses"}
            </Button>
          </Link>
        </div>
      </form>
  );
};

export default CourseForm;
