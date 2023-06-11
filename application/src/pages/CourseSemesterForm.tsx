import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextField, Button, MenuItem, FormHelperText} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import formatSemester from "../utils/semester";
import {DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import workDays from "../utils/days";
import {Link, useParams} from "react-router-dom";
import Select from "react-select";

const schema = z.object({
  semester: z.string().nonempty('Semester is required.'),
  registrationFrom: z.date(),
  registrationTo: z.date(),
  capacity: z.number().min(1, "Capacity must be greater than 0.")
      .max(2000, "Capacity cannot be greater than 2000."),
  room: z.string(),
  timeDay: z.number().optional().nullable(),
  timeHourFrom: z.date().optional().nullable(),
  timeHourTo: z.date().optional().nullable(),
  teachers: z.number().array().min(1, "At least one teacher is required."),
}).refine((data) => data.registrationFrom < data.registrationTo, {
  message: "End date cannot be earlier than start date.",
  path: ["registrationTo"],
}).refine((data) => !data.timeHourFrom || !data.timeHourTo ||
    data.timeHourFrom < data.timeHourTo, {
  message: "End cannot be earlier than start.",
  path: ["timeHourTo"],
});

interface CourseSemesterForm {
  semester: string,
  registrationFrom: Date,
  registrationTo: Date,
  capacity: number,
  room: string,
  timeDay: number | null,
  timeHourFrom: Date | null,
  timeHourTo: Date | null,
  teachers: [number] | null,
}

const CourseSemesterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<CourseSemesterForm>({
    resolver: zodResolver(schema),
  });
  const { code } = useParams();

  //TODO: fetch semester API
  const semesters = [
    {
      year: 2023,
      season: "FALL"
    },
    {
      year: 2024,
      season: "SPRING"
    },
    {
      year: 2024,
      season: "FALL"
    },
    {
      year: 2025,
      season: "SPRING"
    }
  ];

  //TODO: fetch users and set the logged in user as the default value in guarantor input
  const users = [
    { value: 1523, label: 'Jakub Judiny' },
    { value: 835, label: 'David Kajan' },
    { value: 3494, label: 'Michal Drobný' },
    { value: 7671, label: 'Dalibor Švonavec' },
  ]


  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    const hoursFrom = values.timeHourFrom?.getHours();
    const minutesFrom = values.timeHourFrom?.getMinutes();
    const hoursTo = values.timeHourTo?.getHours();
    const minutesTo = values.timeHourTo?.getMinutes();
    //TODO: send data
  };

  return (
    <form
      className="flex flex-col flex-start rounded border-solid border-2
                overflow-y-scroll max-h-screen overflow-x-hidden m-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-poppins text-2xl m-6 font-bold text-blue-950">
        List course {code?.toUpperCase()} in a new semester
      </h1>
      <div className="mx-4 my-1 w-64">
        <TextField
            id="semester"
            label="Semester *"
            select
            fullWidth
            size="small"
            defaultValue = ""
            inputProps={register('semester')}
            error={errors.semester !== undefined}
            helperText={errors.semester?.message}
        >
          {semesters.map((option) => (
              <MenuItem
                  key={formatSemester(option.year, option.season)}
                  value={formatSemester(option.year, option.season)}
              >
                {formatSemester(option.year, option.season)}
              </MenuItem>
          ))}
        </TextField>
      </div>

      <TextField
          id="capacity"
          className="w-64"
          label="Maximum capacity *"
          variant="outlined"
          sx={{ margin: '1rem 1rem 0' }}
          {...register('capacity', { valueAsNumber: true })}
          error={errors.capacity !== undefined}
          size="small"
          helperText={errors.capacity?.message}
          type="number"
          defaultValue="1000"
          InputProps={{
            inputProps: {
              min: 0,
              max: 2000,
            },
          }}
      />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 flex-start mr-auto items-center mt-4 mx-4">
        <Controller
            name="registrationFrom"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <DateTimePicker
                  label="Registration start *"
                  {...field}
                  inputRef={field.ref}
                  className="w-48 mr-4"
                  ampm={false}
                  slotProps={{
                      textField: {
                        ...{ id: "registrationFrom",
                            name: "registrationForm",
                            size: "small",
                            error: errors.registrationFrom !== undefined,
                            helperText: errors.registrationFrom?.message }
                        }
                  }}
              ></DateTimePicker>
            )} />
        <p className="hidden lg:inline">–</p>
        <Controller
            name="registrationTo"
            control={control}
            defaultValue={new Date((new Date()).setMonth((new Date().getMonth()+1)))}
            render={({ field }) => (
                <DateTimePicker
                    label="Registration end *"
                    {...field}
                    inputRef={field.ref}
                    className="w-48"
                    ampm={false}
                    slotProps={{
                      textField: {
                        ...{ id: "registrationTo",
                          size: "small",
                          name: "registrationTo",
                          error: errors.registrationTo !== undefined,
                          helperText: errors.registrationTo?.message }
                      }
                    }}
                ></DateTimePicker>
            )} />
      </div>

      <div className="flex flex-col rounded m-4 border-solid border-2 font-bold">
        <h2 className="font-poppins text-xl mx-4 my-2">
          Lectures
        </h2>
        <TextField
            id="address"
            label="Room"
            variant="outlined"
            className="w-60"
            sx={{ margin: '0 1rem 0.5rem' }}
            {...register('room')}
            error={errors.room !== undefined}
            size="small"
            helperText={errors.room?.message}
        />
        <div className="flex flex-col lg:flex-row lg:flex-row gap-4 lg:gap-0 mt-2 mb-4 mx-4">
          <div>
            <TextField
                id="timeDay"
                label="Day"
                className="w-32"
                select
                size="small"
                inputProps={register('timeDay')}
                error={errors.timeDay !== undefined}
                helperText={errors.timeDay?.message}
            >
              {workDays.map((option) => (
                  <MenuItem
                      key={option.value}
                      value={option.value}
                  >
                    {option.name}
                  </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex flex-row">
            <Controller
                name="timeHourFrom"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                    <TimePicker
                        label="Start"
                        {...field}
                        inputRef={field.ref}
                        className="w-28 mr-4"
                        ampm={false}
                        slotProps={{
                          textField: {
                            ...{ id: "timeHourFrom",
                              name: "timeHourFrom",
                              size: "small",
                              error: errors.timeHourFrom !== undefined,
                              helperText: errors.timeHourFrom?.message }
                          }
                        }}
                    ></TimePicker>
                )} />
            <p className="mx-2 mt-2">–</p>
            <Controller
                name="timeHourTo"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                    <TimePicker
                        label="End"
                        {...field}
                        inputRef={field.ref}
                        className="w-28"
                        ampm={false}
                        slotProps={{
                          textField: {
                            ...{ id: "timeHourTo",
                              size: "small",
                              name: "timeHourTo",
                              error: errors.timeHourTo !== undefined,
                              helperText: errors.timeHourTo?.message }
                          }
                        }}
                    ></TimePicker>
                )} />
          </div>
        </div>
      </div>

      <label htmlFor="teachers" className="mx-4 text-sm">Teachers *</label>
      <Controller
          control={control}
          name="teachers"
          defaultValue={null}
          render={({ field, }) => (
              <Select
                  ref={field.ref}
                  value={users.filter(c => field.value?.includes(c.value))}
                  onChange={val => field.onChange(val.map(c => c.value))}
                  className="w-auto mx-4 mb-2"
                  isClearable={true}
                  isSearchable={true}
                  isMulti={true}
                  id="teachers"
                  name="teachers"
                  options={users}
              />
          )}
      />
      <FormHelperText error sx={{ margin: '0rem 1.5rem' }}>
        {errors.teachers?.message}
      </FormHelperText>

      <div className="flex flex-col content-center justify-center m-auto">
        <Button className="w-52" type="submit" variant="outlined" sx={{ margin: '1rem 2rem' }}>
          Submit
        </Button>
        <Link to={"/courses/" + code}>
          <Button className="w-52" type="submit" variant="outlined" sx={{ margin: '0 2rem 1rem' }}>
            Back to {code}
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default CourseSemesterForm;
