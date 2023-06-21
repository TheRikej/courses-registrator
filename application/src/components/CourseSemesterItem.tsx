import * as React from 'react';
import {Link} from "react-router-dom";

interface CourseSemesterProps {
    course: {
        code: string,
        guarantor: number,
        faculty: string,
        description: string,
        name: string,
        credits: number,
    },
    id: string,
    semesterYear: number,
    semesterSeason: string,
    capacity: number,
    maxCapacity: number,
    teachers: string[],
}

const CourseSemesterItemCard = (props: {course: CourseSemesterProps, isEnrolled: boolean}) => {
  return (
    <Link to={"/courses/" + props.course.course.code + "/" + props.course.semesterYear + props.course.semesterSeason + "/show"} state={{id: props.course.id, isEnrolled: props.isEnrolled}}>
        <div className="flex flex-col m-1">
          <div className="ml-1 lg:mx-2 flex flex-col lg:flex-row">
              <p className="float-left lg:text-lg mb-1 lg:mr-8">
                  <b>{props.course.course.faculty}:{props.course.course.code}/{props.course.semesterYear + props.course.semesterSeason}
                  </b> – {props.course.course.name}
              </p>
              <p className="lg:text-lg mx-auto lg:ml-auto lg:mr-1">{props.course.capacity}/{props.course.maxCapacity}</p>
          </div>
          <div className="mx-1 lg:mx-2 gap-4 hidden lg:flex lg:flex-row">
              <p>Teacher(s): {props.course.teachers.join(", ")}</p>
              <p className="mx-auto lg:ml-auto lg:mr-1">{props.course.course.credits} credits</p>
          </div>
        </div>
    </Link>
  );
};

export default CourseSemesterItemCard;
