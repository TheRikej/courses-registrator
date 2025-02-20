import * as React from 'react';
import {SemesterType} from "../types/semester";
import formatSemester from "../utils/semester";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const SemesterItemCard = (props: {target: SemesterType, id: string}) => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 items-center">
      <p className="m-0 lg:ml-4 float-left text-xl">
        <b>{formatSemester(props.target.year, props.target.season)}</b>
      </p>
      <p className="lg:col-span-2 text-sm lg:text-base">
        ({(new Date(props.target.semesterStart)).toDateString() + " – " + (new Date(props.target.semesterEnd)).toDateString()})
      </p>
      <div>
        <Link to={"/semesters/" + formatSemester(props.target.year, props.target.season) + "/edit" } state={{id: props.id, semester: props.target}}>
          <Button color="success" type="button" variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
            Edit
          </Button>
        </Link>
        <Link to={"/semesters/" + formatSemester(props.target.year, props.target.season) + "/delete"} state={{id: props.id}}>
            <Button color="error" type="button" variant="outlined" sx={{ margin: '0.5rem 0.5rem' }}>
              Delete
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default SemesterItemCard;
