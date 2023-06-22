import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextField, Button, MenuItem, FormHelperText} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import formatSemester from "../utils/semester";
import {DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import workDays from "../utils/days";
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import Select from "react-select";
import { useMutation, useQuery } from '@tanstack/react-query';
import { CourseRequests, SemesterRequests, UserRequests } from '../services';
import { AddSemesterCourseData } from '../services/models';
import { CourseSemesterRequests } from '../services';
import NotAuthorized from "../components/NotAuthorized";
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import { useState } from 'react';

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

const CourseSemesterForm = (props: {isEdit: boolean}) => {
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
  } = useForm<CourseSemesterForm>({
    resolver: zodResolver(schema),
  });
  const { code, semester } = useParams();

  const { state } = useLocation();

  const { data: semesters } = useQuery({
    queryKey: ['semestersCreateCourse'],
    queryFn: () => SemesterRequests.getSemesters(),
  })

  const { data: usersQuery } = useQuery({
    queryKey: ['courseUsers'],
    queryFn: () => UserRequests.getUsers(),
  })

  const { data: courseSemester } = useQuery({
    queryKey: ['courseSemesterForForm'],
    queryFn: () => CourseSemesterRequests.getCourseSemester(state.id),
    enabled: props.isEdit,
  });

  const [success, setSuccess] = useState<boolean>(false);

  const currentTeachers = courseSemester?.data.teachers.map((x: {userName: string; id: number}) => x.id);

  const users = usersQuery?.data.map(x => ({value: x.id, label: x.userName}));

  const { mutate: addSemCOurse } = useMutation({
    mutationFn: async (info: {
        id: string,
        courseInfo: AddSemesterCourseData,
        teachers: [number] | null
    }) => {
      const course = CourseRequests.addCourseSemester(info.id, info.courseInfo)
      const courseSemester = (await course).data.id
      info.teachers?.forEach(teacher => {
        addTeacher({id: teacher, courseId: courseSemester})
      })
      if ((await course).status === 'success') {
        setSuccess(true)
      }
      return course
    }
  });

  const { mutate: editSemCourse } = useMutation({
    mutationFn: async (info: {
        id: string,
        courseInfo: AddSemesterCourseData,
        teachers: [number] | null
    }) => {
      const course = CourseSemesterRequests.editCourseSemester(info.id, info.courseInfo)
      changeTeachers(currentTeachers === undefined ? [] : currentTeachers, info.teachers === null ? [] : info.teachers, info.id)
      if ((await course).status === 'success') {
        setSuccess(true)
      }
      return course
    }
  });

  const { mutate: addTeacher } = useMutation({
    mutationFn: (info: {
        id: number,
        courseId: string,
    }) => CourseSemesterRequests.addTeacherCourse(info.id, info.courseId)
  });

  const { mutate: removeTeacher } = useMutation({
    mutationFn: (info: {
        id: number,
        courseId: string,
    }) => CourseSemesterRequests.removeTeacherCourse(info.id, info.courseId)
  });

  const changeTeachers = (currentTeachers: number[], teachers: number[], courseSemId: string) => {
    teachers.filter(x => !currentTeachers.includes(x)).forEach(x => addTeacher({id: x, courseId: courseSemId}));
    currentTeachers.filter(x => !teachers.includes(x)).forEach(x => removeTeacher({id: x, courseId: courseSemId}));
  };

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]

  const onSubmit = async () => {
    const values = getValues();
    const hoursFrom = values.timeHourFrom?.getHours();
    const minutesFrom = values.timeHourFrom?.getMinutes();
    const hoursTo = values.timeHourTo?.getHours();
    const minutesTo = values.timeHourTo?.getMinutes();
    const hasTimeslot = hoursFrom === undefined || minutesFrom === undefined || hoursTo === undefined || minutesTo === undefined || values.timeDay === null
    const courseData = {
      id: code !== undefined ? code : "",
      courseInfo: {
        semesterId: values.semester,
        registrationStart: values.registrationFrom,
        registrationEnd: values.registrationTo,
        capacity: values.capacity,
        room: values.room,
        timeslot: hasTimeslot || values.timeDay === null ? undefined : {
          day: days[values.timeDay - 1],
          startHour: hoursFrom,
          startMinute: minutesFrom,
          endHour: hoursTo,
          endMinute: minutesTo,
        },
      },
      teachers: values.teachers,
    }
    if (!props.isEdit) {
      await addSemCOurse(courseData);
      reset();
    } else {
      courseData.id = state.id,
      await editSemCourse(courseData);
    }
    reset();
  };

  if (success) {
    return <Navigate to={"/courses"}/>
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
        {props.isEdit
            ? ("Edit course " + code?.toUpperCase() + " in " + semester?.toLowerCase())
            : ("List course " + code?.toUpperCase() + " in a new semester")
        }
      </h1>
      <div className="mx-4 my-1 w-64">
        <TextField
            id="semester"
            label="Semester *"
            select
            fullWidth
            size="small"
            defaultValue = {props.isEdit ? courseSemester?.data.semesterId : ""}
            inputProps={register('semester')}
            error={errors.semester !== undefined}
            helperText={errors.semester?.message}
        >
          {semesters?.data.map((option) => (
              <MenuItem
                  key={formatSemester(option.year, option.season)}
                  value={option.id}
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
          defaultValue = {props.isEdit ? courseSemester?.data.capacity: "1000"}
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
            defaultValue = {props.isEdit && courseSemester?.data.registrationStart !== undefined ? new Date(courseSemester?.data.registrationStart) : new Date()}
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
            defaultValue = {props.isEdit && courseSemester?.data.registrationEnd !== undefined
               ? new Date(courseSemester?.data.registrationEnd)
               : new Date((new Date()).setMonth((new Date().getMonth()+1)))}
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
            defaultValue = {props.isEdit ? courseSemester?.data.room : ""}
            sx={{ margin: '0 1rem 0.5rem' }}
            {...register('room')}
            error={errors.room !== undefined}
            size="small"
            helperText={errors.room?.message}
        />
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 mt-2 mb-4 mx-4">
          <div>
            <TextField
                id="timeDay"
                label="Day"
                className="w-32"
                select
                size="small"
                inputProps={register('timeDay')}
                defaultValue={1}
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
          defaultValue={props.isEdit && currentTeachers !== undefined ? currentTeachers as [number] : null}
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
          Submit
        </Button>
        <Link to={"/courses/" + code + (props.isEdit ? "/"+semester+"/show" : "/show")}  state={{id: state.id, isEnrolled: state.isEnrolled}}>
          <Button color="error" className="w-52" type="submit" variant="outlined" sx={{ margin: '0 2rem 4rem' }}>
            Back to {code}
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default CourseSemesterForm;
