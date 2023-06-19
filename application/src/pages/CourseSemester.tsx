import * as React from 'react';
import {Button} from "@mui/material";
import {Link, useLocation, useParams} from "react-router-dom";
import formatTime from "../utils/timeslot";
import SeminarGroupItem from "../components/SeminarGroupItem";
import formatSemester from "../utils/semester";
import { useQuery } from '@tanstack/react-query';
import { CourseSemesterRequests } from '../services';


const CourseSemester = () => {
    const { code, semester } = useParams();

    let isEnrolled = false;

    const { state } = useLocation();

    const { data: course } = useQuery({
        queryKey: ['courseSemester2'],
        queryFn: () => CourseSemesterRequests.getCourseSemester(state.id),
    });
    const groups = [
        {
            groupNumber: 2,
            capacity: 12,
            maxCapacity: 15,
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
            teachers: ["Random Teacher"],
        },
        {
            groupNumber: 4,
            capacity: 14,
            maxCapacity: 15,
            registrationEnd: "Wed Jun 14 2023 00:00",
            registrationStart: "Fri Jun 25 2023 00:00",
            timeslot: {
                day: "TUESDAY",
                startHour: 13,
                startMinute: 0,
                endHour: 14,
                endMinute: 50,
            },
            room: "B130",
            teachers: ["Petr Švenda"],
        },
        {
            groupNumber: 6,
            capacity: 14,
            maxCapacity: 15,
            registrationEnd: "Wed Jun 14 2023 00:00",
            registrationStart: "Fri Jun 25 2023 00:00",
            timeslot: {
                day: "WEDNESDAY",
                startHour: 13,
                startMinute: 0,
                endHour: 14,
                endMinute: 50,
            },
            room: "B130",
            teachers: ["Lukáš Ručka"],
        },
        {
            groupNumber: 11,
            capacity: 14,
            maxCapacity: 15,
            registrationEnd: "Wed Jun 14 2023 00:00",
            registrationStart: "Fri Jun 25 2023 00:00",
            timeslot: {
                day: "WEDNESDAY",
                startHour: 16,
                startMinute: 0,
                endHour: 17,
                endMinute: 50,
            },
            room: "B130",
            teachers: ["Lukáš Ručka"],
        },
        {
            groupNumber: 5,
            capacity: 1,
            maxCapacity: 15,
            registrationEnd: "Wed Jun 14 2023 00:00",
            registrationStart: "Fri Jun 25 2023 00:00",
            timeslot: {
                day: "THURSDAY",
                startHour: 13,
                startMinute: 0,
                endHour: 14,
                endMinute: 50,
            },
            room: "B116",
            teachers: ["Roman Lacko"],
        },
        {
            groupNumber: 8,
            capacity: 9,
            maxCapacity: 15,
            registrationEnd: "Wed Jun 14 2023 00:00",
            registrationStart: "Fri Jun 25 2023 00:00",
            timeslot: {
                day: "FRIDAY",
                startHour: 13,
                startMinute: 0,
                endHour: 14,
                endMinute: 50,
            },
            room: "B117",
            teachers: ["Luděk Bártek"],
        },
        {
            groupNumber: 8,
            capacity: 9,
            maxCapacity: 15,
            registrationEnd: "Wed Jun 14 2023 00:00",
            registrationStart: "Fri Jun 25 2023 00:00",
            timeslot: {
                day: "FRIDAY",
                startHour: 15,
                startMinute: 0,
                endHour: 16,
                endMinute: 50,
            },
            room: "B116",
            teachers: ["Luděk Bártek"],
        },
    ];

    const enrol = () => {
        isEnrolled = !isEnrolled;
        //TODO: enrol student (API call)
    };

    if(course?.data === undefined) {
        return <></>
    }

    if (!course) return <>Loading...</>;

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Course {code?.toUpperCase()} in {semester?.toLowerCase()}
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-2 max-w-2xl gap-1 p-4">
                <p><b>Name</b>: {course.data.course.name}</p>
                <p><b>Faculty</b>: {course.data.course.faculty.name}</p>
                <p><b>Description</b>: {course.data.course.description}</p>
                <p><b>Credits</b>: {course.data.course.credits}</p>
                <p><b>Teachers</b>: {course.data.teachers.join(", ")}</p>
                <p><b>Guarantor</b>: {course.data.course.guarantor.userName}</p>
                <p><b>Lectures</b>: {course.data.room}, {course.data.timeSlot !== undefined &&  course.data.timeSlot !== null ? formatTime(course?.data.timeSlot) : "No lectures held"}</p>
                <p><b>Capacity</b>: {course.data.currentCapacity}/{course.data.capacity}</p>
                <p><b>Registration</b>: {(new Date(course.data.registrationStart !== undefined ? course.data.registrationStart : 0).toDateString())} – {(new Date(course?.data.registrationEnd !== undefined ? course?.data.registrationEnd : 0).toDateString())}</p>
                <p className="students-only"><b>Status</b>:
                    {isEnrolled ? " Enrolled" : " Not enrolled"}
                </p>
                <p className="mt-4 text-blue-950 text-xl"><b>Seminar groups</b></p>
                <div className="rounded-lg border-solid border-2">
                    <ul className="overflow-y-scroll max-h-64 lg:max-h-60">
                        {groups.map(group =>
                            <li
                                className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                                key={group.groupNumber}
                            >
                                <SeminarGroupItem group={group} semester={semester!} code={code!}/>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="mx-auto students-only hidden mt-2">
                    <Button color={isEnrolled ? "error" : "success"} className="w-52"
                            type="submit" variant="outlined" sx={{ margin: '1rem' }}
                            onClick={enrol}
                    >
                        {!isEnrolled ? "Enrol" : "Leave course"}
                    </Button>
                </div>
                <div className="teachers-only mt-2">
                    <div className="flex flex-col lg:flex-row items-center justify-center block mx-auto">
                        <Link to={"/courses/" + code + "/" + semester + "/seminars/create"}>
                            <Button color="info" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                Create seminar group
                            </Button>
                        </Link>
                        <Link to={"/courses/" + code + "/" + semester + "/edit"}>
                            <Button color="success" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                Edit
                            </Button>
                        </Link>
                        <Link to={"/courses/" + code + "/" + semester + "/delete"}>
                            <Button color="error" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                Delete
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="block mx-auto">
                <Link to={"/"}>
                    <Button type="button" variant="outlined" sx={{ margin: '1.5rem 2rem 1rem' }}>
                        Back to courses
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default CourseSemester;
