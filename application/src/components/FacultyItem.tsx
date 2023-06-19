import * as React from 'react';
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { Link } from 'react-router-dom';
import { FacultyRequests } from '../services';
import { useMutation } from '@tanstack/react-query';

const schema = z.object({
    name: z.string().nonempty("Faculty name cannot be empty.")
        .max(50, "Faculty name cannot be longer than 50 characters."),
});

const FacultyItemCard = (props: {name: string, id: string}) => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<{name: string}>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: props.name,
        }
    });

    const [facName, setName] = useState<string>(props.name);

  const { mutate: editFaculty } = useMutation({
      mutationFn: (info: {
          name: string,
          id: string,
      }) => FacultyRequests.editFaculty( info.name, info.id ),
  });

  const [isEditing, setEditing] = useState<boolean>(false);

  const edit = () => {
    if (!isEditing || errors.name === undefined) {
        setEditing(!isEditing);
    }
  }

  const onSubmit = () => {
      const name = getValues().name;
      editFaculty({ name: name, id: props.id });
      setName(name);
  }

  return (
    <form className="flex flex-col lg:grid lg:grid-cols-2 items-center"
          onSubmit={handleSubmit(onSubmit)}
    >
      {isEditing ?
      <TextField
          id="name"
          label="Faculty name *"
          defaultValue={facName}
          className="w-auto lg:w-72"
          sx={{ margin: '0.5rem 1rem' }}
          size="small"
          multiline
          inputProps={register('name')}
          error={errors.name !== undefined}
          helperText={errors.name?.message}
        />
      :
      <p className="m-0 lg:ml-4 float-left text-xl">
        <b>{facName}</b>
      </p>
      }
      <div className="mr-0 lg:ml-auto">
        <Button onClick={edit} color={isEditing ? "success" : "info"}
                type={isEditing ? "button" : "submit"}
                variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Link to={"/faculties/" + facName + "/delete"} state={{id: props.id}} >
            <Button color="error" type="button" variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
              Delete
            </Button>
        </Link>
      </div>
    </form>
  );
};

export default FacultyItemCard;
