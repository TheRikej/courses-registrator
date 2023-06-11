import * as React from 'react';
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const schema = z.object({
    name: z.string().nonempty("Faculty name cannot be empty.")
        .max(50, "Faculty name cannot be longer than 50 characters."),
});

const FacultyItemCard = (props: {name: string}) => {
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

    const [isEditing, setEditing] = useState<boolean>(false);

  const edit = () => {
    if (!isEditing || errors.name === undefined) {
        setEditing(!isEditing);
    }
  }

  const onSubmit = () => {
      //TODO: edit faculty in db
      // Also change the value in the <p> field (now it comes only
      // from props, but after edit it should have the new value)
      const name = getValues().name;
  }

  return (
    <form className="flex flex-col lg:grid lg:grid-cols-2 items-center"
          onSubmit={handleSubmit(onSubmit)}
    >
      {isEditing ?
      <TextField
          id="name"
          label="Faculty name *"
          defaultValue={props.name}
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
        <b>{props.name}</b>
      </p>
      }
      <div className="mr-0 lg:ml-auto">
        <Button onClick={edit} color={isEditing ? "success" : "info"}
                type={isEditing ? "submit" : "button"}
                variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button color="error" type="button" variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
          Remove
        </Button>
      </div>
    </form>
  );
};

export default FacultyItemCard;
