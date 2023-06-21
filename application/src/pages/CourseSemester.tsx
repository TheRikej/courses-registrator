import * as React from 'react';
import {Button} from "@mui/material";
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import formatTime from "../utils/timeslot";
import SeminarGroupItem from "../components/SeminarGroupItem";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CourseSemesterRequests, SeminarRequests, UserRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import { useState } from 'react';


const CourseSemester = () => {
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }

    const { data: user } = useQuery({
        queryKey: ['userForCourse'],
        queryFn: () => UserRequests.getUser(loggedUser.id.toString()),
    })

    const queryClient = useQueryClient();

    const { code, semester } = useParams();

    const { state } = useLocation();

    const [isEnrolled, setEnrolled] = useState<boolean>(state.isEnrolled);

    const { data: course } = useQuery({
        queryKey: ['courseSemester2'],
        queryFn: () => CourseSemesterRequests.getCourseSemester(state.id),
    });

    const { data: groups } = useQuery({
        queryKey: ['seminarGroups'],
        queryFn: () => SeminarRequests.getSeminars(state.id),
    });

    const { mutate: addStudent } = useMutation({
        mutationFn: async (info: {
            id: number,
            courseId: string,
        }) => { 
            const courseRet = CourseSemesterRequests.addStudentCourse(info.id, info.courseId);
            if ((await courseRet).status === 'success') {
                setEnrolled(!isEnrolled)
            }
            return courseRet
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courseSemester2']);
        },
      });

      const { mutate: removeStudent } = useMutation({
        mutationFn: async (info: {
            id: number,
            courseId: string,
        }) => { 
            const courseRet = CourseSemesterRequests.removeStudentCourse(info.id, info.courseId);
            if ((await courseRet).status === 'success') {
                setEnrolled(!isEnrolled)
            }
            return courseRet
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courseSemester2']);
        },
      });

    const enrol = () => {
        if (!isEnrolled) {
            addStudent({
                id: loggedUser.id,
                courseId: state.id,
            });
        } else {
            removeStudent({
                id: loggedUser.id,
                courseId: state.id,
            });
        }
    };


    if(course?.data === undefined || groups?.data === undefined || user?.data === undefined) {
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
                <p><b>Teachers</b>: {course.data.teachers.map((teacher) => teacher.userName).toString()}</p>
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
                        {groups.data.map((group) =>
                            <li
                                className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                                key={group.groupNumber}
                            >
                                <SeminarGroupItem isEnrolledSemester={isEnrolled} group={group} semester={semester!}
                                code={code!} id={group.id} courseSemesterId={state.id} isEnrolled={user?.data.studiedGroups.filter(x => x.group.id === group.id).length > 0}/>
                            </li>
                        )}
                    </ul>
                </div>

                {(loggedUser.student) ?
                    <div className="mx-auto students-only mt-2">
                        <Button color={isEnrolled ? "error" : "success"} className="w-52"
                                type="submit" variant="outlined" sx={{ margin: '1rem' }}
                                onClick={enrol}
                        >
                            {!isEnrolled ? "Enrol" : "Leave course"}
                        </Button>
                    </div>
                : <></>}
                {(loggedUser.admin || loggedUser.teacher) ?
                    <div className="teachers-only mt-2">
                        <div className="flex flex-col lg:flex-row items-center justify-center block mx-auto">
                            <Link to={"/courses/" + code + "/" + semester + "/seminars/create"} state={{id: state.id, isEnrolled: isEnrolled, courseSemesterId: state.id}}>
                                <Button color="info" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                    Create seminar group
                                </Button>
                            </Link>
                            <Link to={"/courses/" + code + "/" + semester + "/edit"} state={{id: course.data.id, isEnrolled: isEnrolled}}>
                                <Button color="success" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                    Edit
                                </Button>
                            </Link>
                            <Link to={"/courses/" + code + "/" + semester + "/delete"} state={{id: course.data.id, isEnrolled: isEnrolled}} >
                                <Button color="error" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    </div>
                : <></>}
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
