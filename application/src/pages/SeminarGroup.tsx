import * as React from 'react';
import SemesterItem from "../components/SemesterItem";
import {Button} from "@mui/material";
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import formatSemester from "../utils/semester";
import formatTime from "../utils/timeslot";
import NotAuthorized from "../components/NotAuthorized";
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SeminarRequests, UserRequests } from '../services';
import { useState } from 'react';

const SeminarGroup = () => {
    const { code, semester, group } = useParams();

    const { state } = useLocation();

    const queryClient = useQueryClient()

    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }

    const { data: user } = useQuery({
        queryKey: ['userForSeminar'],
        queryFn: () => UserRequests.getUser(loggedUser.id.toString()),
    })

    const enrolledSeminars = user?.data.studiedGroups.map(x => x.group.id);

    const isEnrolledBegining = enrolledSeminars?.includes(state.id);
    const [isEnrolled, setEnrolled] = useState<boolean>(state.isEnrolled/*isEnrolledBegining !== undefined ? isEnrolledBegining : true */);

    const { data: seminar } = useQuery({
        queryKey: ['seminarGroup'],
        queryFn: () => {
            if (loggedUser.teacher) {
                return SeminarRequests.getSeminar(state.id)
            }
            return SeminarRequests.getSeminarStudent(state.id)
        },
    });

    const { mutate: addStudent } = useMutation({
        mutationFn: async (info: {
            id: number,
            seminarId: string,
        }) => { 
            const seminarRet = SeminarRequests.addStudentSeminar(info.id, info.seminarId);
            if ((await seminarRet).status === 'success') {
                setEnrolled(!isEnrolled)
            }
            return seminarRet
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['seminarGroup']);
        },
      });

      const { mutate: removeStudent } = useMutation({
        mutationFn: async (info: {
            id: number,
            seminarId: string,
        }) => { 
            const seminarRet = SeminarRequests.removeStudentSeminar(info.id, info.seminarId);
            if ((await seminarRet).status === 'success') {
                setEnrolled(!isEnrolled)
            }
            return seminarRet
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['seminarGroup']);
        },
      });

    const enrol = () => {
        if (!isEnrolled) {
            addStudent({
                id: loggedUser.id,
                seminarId: state.id,
            });
        } else {
            removeStudent({
                id: loggedUser.id,
                seminarId: state.id,
            });
        }
    };

    if(seminar?.data === undefined) {
        return <></>
    }

    if (!seminar) return <>Loading...</>;

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Seminar group {seminar.data.groupNumber}
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-2 max-w-3xl gap-2 p-4">
                <p><b>Course</b>: {code?.toUpperCase()} ({semester?.toLowerCase()})</p>
                <p><b>Teachers</b>: {seminar.data.teachers.map(x => x.userName).toString()}</p>
                <p><b>Room & Time</b>: {seminar.data.room}, {formatTime(seminar.data.timeSlot)}</p>
                <p><b>Capacity</b>: {seminar.data.currentCapacity}/{seminar.data.capacity}</p>
                <p><b>Registration</b>: {(new Date(seminar.data.registrationStart)).toDateString()} – {(new Date(seminar.data.registrationEnd)).toDateString()}</p>
                {loggedUser.student ??
                    <p className="students-only"><b>Status</b>:
                        {isEnrolled ? " Enrolled" : " Not enrolled"}
                    </p>
                }
                {loggedUser.student ?
                    <div className="mx-auto students-only">
                        <Button color={isEnrolled ? "error" : "success"} className="w-52"
                                type="submit" variant="outlined" sx={{ margin: '1rem' }}
                                onClick={enrol}
                        >
                            {!isEnrolled ? "Enrol in the group" : "Leave group"}
                        </Button>
                    </div>
                : <></>}
                {(loggedUser.admin || loggedUser.teacher) ?
                    <div className="teachers-only">
                        <p><b>Students</b>: {seminar.data.students === undefined ? null : seminar.data.students.map(x => x.student.userName).toString()}</p>
                        <div className="flex flex-row justify-center block mx-auto mt-2">
                            <Link to={"/courses/" + code + "/" + semester + "/seminars/" + group + "/edit"} state={{id: state.id, courseSemesterId: state.courseSemesterId}}>
                                <Button color="success" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                    Edit
                                </Button>
                            </Link>
                            <Link to={"/courses/" + code + "/" + semester + "/seminars/" + group + "/delete"} state={{id: state.id, courseSemesterId: state.courseSemesterId}}>
                                <Button color="error" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    </div>
                : <></>}
            </div>
            <div className="block mx-auto">
                <Link to={"/courses/" + code + "/" + semester + "/show"} state={{id: state.courseSemesterId}}>
                    <Button type="button" variant="outlined" sx={{ margin: '1.5rem 2rem 1rem' }}>
                        Back to {code?.toUpperCase()}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SeminarGroup;
