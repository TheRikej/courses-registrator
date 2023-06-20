import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextField, Button, MenuItem, FormHelperText} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import workDays from "../utils/days";
import {Link, useLocation, useParams} from "react-router-dom";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserRequests } from '../services';
import { SeminarRequests } from '../services';
import { SeminarGroupModel } from '../services/models';

const schema = z.object({
  groupNumber: z.number().min(1, "Group number must be greater than 0.")
      .max(1000, "Group number cannot be greater than 200."),
  capacity: z.number().min(1, "Capacity must be greater than 0.")
      .max(200, "Capacity cannot be greater than 200."),
  registrationFrom: z.date(),
  registrationTo: z.date(),
  room: z.string().nonempty("Room is required."),
  timeDay: z.number({ required_error: 'Day is required.'}),
  timeHourFrom: z.date({ required_error: 'Start time is required.',
      invalid_type_error: 'Start time is required.'}),
  timeHourTo: z.date({ required_error: 'End time is required.',
      invalid_type_error: 'End time is required.'}),
  teachers: z.number({invalid_type_error: 'At least one teacher is required.'})
      .array()
      .min(1, "At least one teacher is required."),
}).refine((data) => data.registrationFrom < data.registrationTo, {
  message: "End date cannot be earlier than start date.",
  path: ["registrationTo"],
}).refine((data) => !data.timeHourFrom || !data.timeHourTo ||
    data.timeHourFrom < data.timeHourTo, {
  message: "End cannot be earlier than start.",
  path: ["timeHourTo"],
});

interface SeminarGroupForm {
  groupNumber: number,
  registrationFrom: Date,
  registrationTo: Date,
  capacity: number,
  room: string,
  timeDay: number | null,
  timeHourFrom: Date | null,
  timeHourTo: Date | null,
  teachers: [number] | null,
}

//TODO: default Values when editing ("defaultValue={...}")
const SeminarGroupForm = (props: {isEdit: boolean}) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<SeminarGroupForm>({
    resolver: zodResolver(schema),
  });
  const { code, semester, group } = useParams();

  const { data: usersQuery } = useQuery({
    queryKey: ['seminarUsers'],
    queryFn: () => UserRequests.getUsers(),
  })

  const { mutate: addTeacher } = useMutation({
    mutationFn: (info: {
        id: number,
        courseId: string,
    }) => SeminarRequests.addTeacherSeminar(info.id, info.courseId)
  });

  const { state } = useLocation();

  const users = usersQuery?.data.map(x => ({value: x.id, label: x.userName}));

  const queryClient = useQueryClient();

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

  const { mutate: addSeminar } = useMutation({
    mutationFn: async (info: {
        id: string,
        courseInfo: SeminarGroupModel,
        teachers: [number] | null
    }) => {
      const seminar = SeminarRequests.createCourse(info.id, info.courseInfo)
      console.log((await seminar).data.id)
      const courseSemester = (await seminar).data.id
      info.teachers?.forEach(teacher => {
        addTeacher({id: teacher, courseId: courseSemester})
      })
      return seminar
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seminarGroups']);
    },
  });

  const onSubmit = async () => {
    const values = getValues();
    console.log(values);
    const hoursFrom = values.timeHourFrom?.getHours();
    const minutesFrom = values.timeHourFrom?.getMinutes();
    const hoursTo = values.timeHourTo?.getHours();
    const minutesTo = values.timeHourTo?.getMinutes();
    if (!props.isEdit) {
      await addSeminar({
        id: state.id,
        courseInfo: {
          groupNumber: values.groupNumber,
          registrationStart: values.registrationFrom,
          registrationEnd: values.registrationTo,
          capacity: values.capacity,
          room: values.room,
          timeslot: {
            day: values.timeDay !== null ? days[values.timeDay] : days[0],
            startHour: hoursFrom !== undefined ? hoursFrom : 0,
            startMinute: minutesFrom !== undefined ? minutesFrom: 0,
            endHour: hoursTo !== undefined ? hoursTo: 0,
            endMinute: minutesTo !== undefined ? minutesTo : 0,
          },
        },
        teachers: values.teachers,
      });
      reset();
    }
  }

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
        {!props.isEdit ?
            "Create a seminar group for " + code?.toUpperCase() + " (" + semester?.toLowerCase() + ")"
            : "Edit seminar " + group + " (" + code?.toUpperCase() + ", " + semester?.toLowerCase() + ")"}
      </h1>

      <TextField
          id="groupNumber"
          className="w-64"
          label="Group number *"
          variant="outlined"
          sx={{ margin: '1rem 1rem 0' }}
          {...register('groupNumber', { valueAsNumber: true })}
          error={errors.groupNumber !== undefined}
          size="small"
          helperText={errors.groupNumber?.message}
          type="number"
          defaultValue="1"
          InputProps={{
            inputProps: {
              min: 0,
              max: 1000,
            },
          }}
      />

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
          defaultValue="30"
          InputProps={{
            inputProps: {
              min: 0,
              max: 200,
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
          Seminar
        </h2>
        <TextField
            id="address"
            label="Room *"
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
                label="Day *"
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
                        label="Start *"
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
                        label="End *"
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
            
                <Button color="success" className="w-52" type="submit" variant="outlined" sx={{ margin: '1rem 2rem' }}>
                  {props.isEdit ? "Submit" : "Create"}
                </Button>
            
            <Link to={"/courses/" + code + "/" + semester?.toLowerCase() + "/"
                    + (props.isEdit ? ("seminars/" + group + "/") : "") + "show"} state={{id: state.id}}>
                <Button color="error" className="w-52" type="submit" variant="outlined" sx={{ margin: '0 2rem 2rem' }}>
                    {"Back to " + code + (props.isEdit ? "/"+group : "")}
                </Button>
            </Link>
        </div>
    </form>
  );
};

export default SeminarGroupForm;
