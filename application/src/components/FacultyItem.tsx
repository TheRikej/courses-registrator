import * as React from 'react';
import {Button} from "@mui/material";

const FacultyItemCard = (props: {name: string}) => {
  const edit = () => {
    //TODO: edit faculty
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 items-center">
      <p className="m-0 lg:ml-4 float-left text-xl">
        <b>{props.name}</b>
      </p>
      <div className="mr-0 ml-auto">
        <Button color="success" onClick={edit} type="button" variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
          Edit
        </Button>
        <Button color="error" type="button" variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default FacultyItemCard;
