import * as React from 'react';
import SemesterItem from "../components/SemesterItem";
import {Button} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import formatSemester from "../utils/semester";
import formatTime from "../utils/timeslot";

const SeminarGroup = () => {
    const { code, semester, group } = useParams();
    //TODO: fetch for the given user
    const isEnrolled = false;

    //TODO: fetch seminar group API
    const seminar = {
        groupNumber: 2,
        capacity: 129,
        maxCapacity: 150,
        registrationEnd: "Wed Jun 14 2023 00:00",
        registrationStart: "Fri Jun 25 2023 00:00",
        timeslot: {
            day: "MONDAY",
            startHour: 13,
            startMinute: 0,
            endHour: 14,
            endMinute: 50,
        },
        room: "B116",
        teachers: ["Jakub Judiny", "Petr Švenda"],
    };
    const students = ["Tomáš Pekný", "Ivan Škaredý", "Janko Hraško", "Marienka Stará",
            "Albrecht Hrozný", "Ferdinand Slabý", "Augustín Silný",
            "Anežka Nemecká", "Hilbert Krátky", "Janko Nehraško"];

    const enrol = () => {
        //TODO: enrol student (API call)
    };


    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Seminar group {seminar.groupNumber}
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-2 max-w-3xl gap-2 p-4">
                <p><b>Course</b>: {code?.toUpperCase()} ({semester?.toLowerCase()})</p>
                <p><b>Teachers</b>: {seminar.teachers.join(", ")}</p>
                <p><b>Room & Time</b>: {seminar.room}, {formatTime(seminar.timeslot)}</p>
                <p><b>Capacity</b>: {seminar.capacity}/{seminar.maxCapacity}</p>
                <p><b>Registration</b>: {seminar.registrationStart} – {seminar.registrationEnd}</p>
                <p className="students-only hidden"><b>Status</b>:
                    {isEnrolled ? " Enrolled" : " Not enrolled"}
                </p>
                <div className="mx-auto students-only hidden">
                    <Button color={isEnrolled ? "error" : "success"} className="w-52"
                            type="submit" variant="outlined" sx={{ margin: '1rem' }}
                            onClick={enrol}
                    >
                        {!isEnrolled ? "Enrol in the group" : "Leave group"}
                    </Button>
                </div>
                <div className="teachers-only">
                    <p><b>Students</b>: {students.join(", ")}</p>
                    <div className="flex flex-row justify-center block mx-auto mt-2">
                        <Link to={"/courses/" + code + "/" + semester + "/seminars/" + group + "/edit"}>
                            <Button color="success" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                Edit
                            </Button>
                        </Link>
                        <Link to={"/courses/" + code + "/" + semester + "/seminars/" + group + "/delete"}>
                            <Button color="error" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                Delete
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="block mx-auto">
                <Link to={"/courses/" + code + "/" + semester + "/show"}>
                    <Button type="button" variant="outlined" sx={{ margin: '1.5rem 2rem 1rem' }}>
                        Back to {code?.toUpperCase()}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SeminarGroup;
