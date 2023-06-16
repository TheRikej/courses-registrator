import * as React from 'react';
import {Link} from "react-router-dom";
import formatTime from "../utils/timeslot";

interface CourseProps {
    code: string,
    guarantor: string,
    faculty: string,
    description: string,
    name: string,
    credits: number,
}

const CourseItemCard = (props: {course: CourseProps}) => {
  return (
    <Link to={"/courses/" + props.course.code + "/show"}>
        <div className="flex flex-col m-1">
          <p className="mx-1 lg:mx-2 float-left lg:text-lg">
              <b>{props.course.faculty}:{props.course.code}</b> – {props.course.name}
          </p>
          <div className="flex flex-row mx-1 lg:mx-2">
              <p className="hidden lg:block">Guarantor: {props.course.guarantor}</p>
              <p className="mx-auto lg:ml-auto lg:mr-1">{props.course.credits} credits</p>
          </div>
        </div>
    </Link>
  );
};

export default CourseItemCard;
