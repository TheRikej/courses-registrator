import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextField, Button, MenuItem} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {DateTimePicker} from "@mui/x-date-pickers";
import {Link, useParams} from "react-router-dom";

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

//TODO: default Values when editing ("defaultValue={...}")
const SemesterForm = (props: {isEdit: boolean}) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<SemesterForm>({
    resolver: zodResolver(schema),
  });
  const { semester } = useParams();

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    //TODO: send data (but beware difference between create/edit)
  };

  return (
    <form
      className="flex flex-col flex-start rounded border-solid border-2
                overflow-y-scroll max-h-screen overflow-x-hidden m-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-poppins text-2xl m-6 font-bold text-blue-950">
          {props.isEdit ? ("Edit semester " + semester?.toLowerCase()) : "Create new semester"}
      </h1>

      <div className="mx-4 my-1 w-64">
        <TextField
            id="season"
            label="Season *"
            className="w-60"
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
          label="Year *"
          variant="outlined"
          sx={{ margin: '1rem 2rem 1rem 1rem', width: '15rem' }}
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
                  className="w-60"
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
                    className="w-60"
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

      <div className="flex flex-col content-center justify-center">
        <Button color="success" className="w-52" type="submit" variant="outlined" sx={{ margin: '1rem 2rem' }}>
          {props.isEdit ? "Submit" : "Create"}
        </Button>
        <Link to="/semesters/">
            <Button color="error" className="w-52" type="submit" variant="outlined" sx={{ margin: '0 2rem' }}>
              Back to semesters
            </Button>
        </Link>
      </div>
    </form>
  );
};

export default SemesterForm;
