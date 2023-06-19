import * as React from 'react';
import {Button} from "@mui/material";
import {Link, Navigate, useParams} from "react-router-dom";
import { CourseRequests } from '../services';
import { useQuery } from '@tanstack/react-query';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";

const Course = () => {
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }

    const { code } = useParams();

    const { data: course } = useQuery({
        queryKey: ['course'],
        queryFn: () => CourseRequests.getCourse(code !== undefined ? code: ""),
    });

    if(course?.data === undefined) {
        return <></>
    }

    if (!course) return <>Loading...</>;
    //TODO: credits

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Course {code?.toUpperCase()}
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-2 max-w-2xl gap-1 p-4">
                <p><b>Name</b>: {course.data.name}</p>
                <p><b>Faculty</b>: {course.data.faculty.name}</p>
                <p><b>Description</b>: {course.data.description}</p>
                <p><b>Guarantor</b>: {course.data.guarantor.userName}</p>
                <p><b>Credits</b>: {}</p>
                <p className="mt-2"><b>Listed in semesters</b>:</p>
                <ul className="border-solid border-2 overflow-y-scroll max-h-44 lg:max-h-36">
                    {course.data.semesters.map(semester =>
                        <Link key={semester} to={"/courses/" + code + "/" + semester + "/show"}>
                            <li className="m-1">
                                • <span className="underline">{semester}</span>
                            </li>
                        </Link>
                    )}
                </ul>
                {(loggedUser.admin || loggedUser.teacher) ?
                    <div>
                        <div className="flex flex-row justify-center block mx-auto">
                            <Link to={"/courses/" + code + "/list"}>
                                <Button color="info" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                    List
                                </Button>
                            </Link>
                            <Link to={"/courses/" + code + "/edit"} state={{id: code, course: course.data}}>
                                <Button color="success" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                    Edit
                                </Button>
                            </Link>
                            <Link to={"/courses/" + code + "/delete"}>
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

export default Course;
