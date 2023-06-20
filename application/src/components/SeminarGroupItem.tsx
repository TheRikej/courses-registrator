import * as React from 'react';
import {Link} from "react-router-dom";
import formatTime from "../utils/timeslot";

interface SeminarGroupProps {
    groupNumber: number,
    currentCapacity: number,
    capacity: number,
    registrationEnd: Date,
    registrationStart: Date,
    timeSlot: {
        day: string,
        startHour: number,
        startMinute: number,
        endHour: number,
        endMinute: number,
    },
    room: string,
    teachers: {userName: string}[]
}

const SeminarGroupItemCard = (props: {group: SeminarGroupProps, code: string, semester: string, id: string}) => {
  const usernames = props.group.teachers.map((teacher) => teacher.userName).toString();
  return (
    <Link to={"/courses/" + props.code + "/" + props.semester + "/seminars/" + props.group.groupNumber + "/show"} state={{id: props.id}}>
        <div className="flex flex-col lg:flex-row items-center w-full">
          <p className="m-0 lg:ml-2 float-left">
              <b>Group {props.group.groupNumber}</b> ({props.group.room}, {formatTime(props.group.timeSlot)}):
              {" " + usernames}
          </p>
          <div className="lg:ml-auto mr-4">
              <p>{props.group.currentCapacity}/{props.group.capacity}</p>
          </div>
        </div>
    </Link>
  );
};

export default SeminarGroupItemCard;
