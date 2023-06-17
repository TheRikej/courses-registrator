import * as React from 'react';
import {Link} from "react-router-dom";
import formatTime from "../utils/timeslot";

interface SeminarGroupProps {
    groupNumber: number,
    capacity: number,
    maxCapacity: number,
    registrationEnd: string,
    registrationStart: string,
    timeslot: {
        day: string,
        startHour: number,
        startMinute: number,
        endHour: number,
        endMinute: number,
    },
    room: string,
    teachers: string[],
}

const SeminarGroupItemCard = (props: {group: SeminarGroupProps, code: string, semester: string}) => {
  return (
    <Link to={"/courses/" + props.code + "/" + props.semester + "/seminars/" + props.group.groupNumber + "/show"}>
        <div className="flex flex-col lg:flex-row items-center w-full">
          <p className="m-0 lg:ml-2 float-left">
              <b>Group {props.group.groupNumber}</b> ({props.group.room}, {formatTime(props.group.timeslot)}):
              {" " + props.group.teachers.join(", ")}
          </p>
          <div className="lg:ml-auto mr-4">
              <p>{props.group.capacity}/{props.group.maxCapacity}</p>
          </div>
        </div>
    </Link>
  );
};

export default SeminarGroupItemCard;
