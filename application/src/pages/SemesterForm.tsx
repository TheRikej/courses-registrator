import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextField, Button, MenuItem, FormHelperText} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {DateTimePicker, TimePicker} from "@mui/x-date-pickers";

const schema = z.object({
  year: z.number().min(2000, "Year must be greater than 2000."),
  semesterFrom: z.date(),
  semesterTo: z.date(),
  season: z.string(),
}).refine((data) => data.semesterFrom < data.semesterTo, {
  message: "End date cannot be earlier than start date.",
  path: ["semesterTo"],
});

interface SemesterForm {
    year: number,
    semesterFrom: Date,
    semesterTo: Date,
    season: "SPRING" | "FALL",
}

const SemesterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<SemesterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    //TODO: send data
  };

  return (
    <form
      className="flex flex-col flex-start rounded border-solid border-2
                overflow-y-scroll max-h-screen overflow-x-hidden m-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-poppins text-2xl m-6 font-bold text-blue-950">
        Create new semester
      </h1>

      <div className="mx-4 my-1 w-64">
        <TextField
            id="season"
            label="Season *"
            className="w-48"
            select
            size="small"
            defaultValue = "SPRING"
            inputProps={register('season')}
            error={errors.season !== undefined}
            helperText={errors.season?.message}
        >
            <MenuItem key="SPRING" value="SPRING">Spring</MenuItem>
            <MenuItem key="FALL" value="FALL">Fall</MenuItem>
        </TextField>
      </div>

      <TextField
          id="year"
          className="w-auto lg:w-48"
          label="Year *"
          variant="outlined"
          sx={{ margin: '1rem 1rem' }}
          {...register('year', { valueAsNumber: true })}
          error={errors.year !== undefined}
          size="small"
          helperText={errors.year?.message}
          type="number"
          defaultValue={2023}
          InputProps={{
              inputProps: {
                  min: 2000,
              },
          }}
      />

      <div className="flex flex-col gap-6 flex-start mr-auto items-center my-2 mx-4">
        <Controller
            name="semesterFrom"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <DateTimePicker
                  label="Semester start *"
                  {...field}
                  inputRef={field.ref}
                  className="w-48 mr-4"
                  ampm={false}
                  slotProps={{
                      textField: {
                        ...{ id: "semesterFrom",
                            name: "semesterFrom",
                            size: "small",
                            error: errors.semesterFrom !== undefined,
                            helperText: errors.semesterFrom?.message }
                        }
                  }}
              ></DateTimePicker>
            )} />
        <Controller
            name="semesterTo"
            control={control}
            defaultValue={new Date((new Date()).setMonth((new Date().getMonth()+1)))}
            render={({ field }) => (
                <DateTimePicker
                    label="Semester end *"
                    {...field}
                    inputRef={field.ref}
                    className="w-48"
                    ampm={false}
                    slotProps={{
                      textField: {
                        ...{ id: "semesterTo",
                          size: "small",
                          name: "semesterTo",
                          error: errors.semesterTo !== undefined,
                          helperText: errors.semesterTo?.message }
                      }
                    }}
                ></DateTimePicker>
            )} />
      </div>

      <div className="flex content-center justify-center">
        <Button type="submit" variant="outlined" sx={{ margin: '1rem 2rem' }}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default SemesterForm;
