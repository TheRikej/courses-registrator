import * as React from 'react';
import SemesterItem from "../components/SemesterItem";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import formatSemester from "../utils/semester";

const Semesters = () => {
    const sems = [{
            year: 2025,
            season: "SPRING",
            semesterStart: new Date(2025, 2, 15),
            semesterEnd: new Date(2025, 5, 22),
        },
        {
            year: 2025,
            season: "FALL",
            semesterStart: new Date(2025, 12, 15),
            semesterEnd: new Date(2025, 11, 22),
        },
        {
            year: 2026,
            season: "SPRING",
            semesterStart: new Date(2026, 2, 17),
            semesterEnd: new Date(2026, 6, 2),
        },
        {
            year: 2026,
            season: "SPRING",
            semesterStart: new Date(2026, 1, 27),
            semesterEnd: new Date(2026, 6, 2),
        },
        {
            year: 2027,
            season: "SPRING",
            semesterStart: new Date(2027, 2, 17),
            semesterEnd: new Date(2027, 6, 2),
        },
        {
            year: 2026,
            season: "FALL",
            semesterStart: new Date(2026, 8, 29),
            semesterEnd: new Date(2026, 11, 29),
        }];

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Semesters
            </h1>
            <div className="rounded-lg border-solid border-2 mx-2">
                <ul className="overflow-y-scroll max-h-96 lg:max-h-80">
                    {sems.map(semester =>
                    <li
                        className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                        key={formatSemester(semester.year, semester.season)}
                    >
                        <SemesterItem target={semester}/>
                    </li>
                    )}
                </ul>
            </div>
            <div className="block mx-auto">
                <Link to="/semesters/create">
                    <Button type="submit" variant="outlined" sx={{ margin: '1.5rem 2rem 1rem' }}>
                        Create new semester
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Semesters;
