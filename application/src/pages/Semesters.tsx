import * as React from 'react';
import SemesterItem from "../components/SemesterItem";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import formatSemester from "../utils/semester";
import { useQuery } from '@tanstack/react-query';
import { SemesterRequests } from '../services';

const Semesters = () => {

    const { data: sems } = useQuery({
        queryKey: ['semesters'],
        queryFn: () => SemesterRequests.getSemesters(),
    })

    if(sems?.data === undefined) {
        return <></>
    }

    if (!sems) return <>Loading...</>;

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Semesters
            </h1>
            <div className="rounded-lg border-solid border-2 mx-2">
                <ul className="overflow-y-scroll max-h-96 lg:max-h-80">
                    {sems.data.map(semester =>
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
