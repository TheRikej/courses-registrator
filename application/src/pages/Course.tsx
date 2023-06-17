import * as React from 'react';
import {Button} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import formatTime from "../utils/timeslot";

const Course = () => {
    const { code } = useParams();

    //TODO: fetch course API
    const course = {
        code: "PB138",
        name: "Modern markup languages",
        description: "Also includes modern web development.",
        guarantor: "Tomáš Pitner",
        credits: 5,
        faculty: "FI",
        semesters: ["spring2018", "spring2019","spring2020", "spring2021", "spring2022", "fall2023", "fall2024"],
    };

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Course {code?.toUpperCase()}
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-2 max-w-2xl gap-1 p-4">
                <p><b>Name</b>: {course.name}</p>
                <p><b>Faculty</b>: {course.faculty}</p>
                <p><b>Description</b>: {course.description}</p>
                <p><b>Guarantor</b>: {course.guarantor}</p>
                <p><b>Credits</b>: {course.credits}</p>
                <p className="mt-2"><b>Listed in semesters</b>:</p>
                <ul className="border-solid border-2 overflow-y-scroll max-h-44 lg:max-h-36">
                    {course.semesters.map(semester =>
                        <Link key={semester} to={"/courses/" + code + "/" + semester + "/show"}>
                            <li className="m-1">
                                • <span className="underline">{semester}</span>
                            </li>
                        </Link>
                    )}
                </ul>
                <div className="teachers-only">
                    <div className="flex flex-row justify-center block mx-auto">
                        <Link to={"/courses/" + code + "/list"}>
                            <Button color="info" type="button" variant="outlined" sx={{ margin: '1rem 1rem 0.5rem' }}>
                                List
                            </Button>
                        </Link>
                        <Link to={"/courses/" + code + "/edit"}>
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
