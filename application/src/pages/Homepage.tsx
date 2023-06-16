import * as React from 'react';
import {Button, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import formatSemester from "../utils/semester";
import {useState} from "react";
import {Clear} from "@mui/icons-material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CourseItem from "../components/CourseItem";
import CourseSemesterItem from "../components/CourseSemesterItem";

const Courses = () => {
    const [enrolledOnly, setEnrolledOnly] = useState<boolean>(false);
    const [teachingOnly, setTeachingOnly] = useState<boolean>(false);

    //TODO: fetch course API
    const courseNoSemester = {
        code: "PB138",
        name: "Modern markup languages",
        description: "Also includes modern web development.",
        guarantor: "Tomáš Pitner",
        credits: 5,
        faculty: "FI",
        semesters: ["spring2018", "spring2019","spring2020", "spring2021", "spring2022", "fall2023", "fall2024"],
    };

    const coursesNoSemester = [courseNoSemester, courseNoSemester, courseNoSemester, courseNoSemester];

    //TODO: fetch coursesemester API
    const course = {
        course: {
            code: "PB071",
            name: "Principles of Low-level Programming in C",
            description: "You will learn about technologies such as XML, XSLT, HTMl, CSS, Typescript, React, Docker" +
                " and many more.. Modern web development is also included.",
            guarantor: "Petr Švenda",
            credits: 5,
            faculty: "FI",
        },
        semester: "spring2022",
        capacity: 329,
        maxCapacity: 400,
        registrationEnd: "Wed Jun 14 2023 00:00",
        registrationStart: "Fri Jun 25 2023 00:00",
        timeslot: {
            day: "TUESDAY",
            startHour: 16,
            startMinute: 0,
            endHour: 17,
            endMinute: 40,
        },
        room: "B117",
        teachers: ["Petr Švenda", "Roman Lacko", "Lukáš Ručka"],
    };

    const courses = [course, course, course, course, course,
        course, course, course, course, course, course, course];

    //TODO: fetch semesters API
    const semesters = [
        {
            year: 2023,
            season: "FALL"
        },
        {
            year: 2024,
            season: "SPRING"
        },
        {
            year: 2024,
            season: "FALL"
        },
        {
            year: 2025,
            season: "SPRING"
        }
    ];

    //TODO: fetch faculties API
    const faculties = [
        {
            name: "FI"
        },
        {
            name: "PrF"
        },
        {
            name: "LF"
        },
        {
            name: "ESF"
        },
        {
            name: "PřF"
        },
    ];

    const changeEnrolledOnly = () => {
        setEnrolledOnly(!enrolledOnly);
    }

    const changeTeachingOnly = () => {
        setTeachingOnly(!teachingOnly);
    }

    const handleFilter = () => {
        //TODO:
    };

    const clearFilter = () => {
        //TODO:
    };

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-auto my-3 font-bold text-blue-950">
                Courses
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-auto max-w-lg p-4">
                <div className="flex flex-col lg:flex-row gap-2 mb-3">
                    <div className="w-44">
                        <TextField
                            id="semester"
                            label="Semester"
                            select
                            fullWidth
                            size="small"
                            defaultValue = "None"
                        >
                            <MenuItem key={0} value={"None"}>
                                None
                            </MenuItem>
                            <MenuItem key={1} value={"Any"}>
                                Any semester
                            </MenuItem>
                            {semesters.map((option) => (
                                <MenuItem
                                    key={formatSemester(option.year, option.season)}
                                    value={formatSemester(option.year, option.season)}
                                >
                                    {formatSemester(option.year, option.season)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="w-64 lg:w-72">
                        <TextField
                            id="faculty"
                            label="Faculty"
                            select
                            fullWidth
                            size="small"
                            defaultValue = "_All_"
                        >
                            <MenuItem key={0} value={"_All_"}>
                                All faculties
                            </MenuItem>
                            {faculties.map((option) => (
                                <MenuItem
                                    key={option.name}
                                    value={option.name}
                                >
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>

                <TextField
                    id="name"
                    label="Name / Code"
                    className="textboxWide"
                    size="small"
                    multiline
                />
                <FormGroup className="mt-3">
                    <FormControlLabel control={<Checkbox onChange={changeEnrolledOnly} disableRipple style={{padding: '0 0.5rem'}}/>}
                                      label="Only show courses I am enrolled in."/>
                    <FormControlLabel control={<Checkbox onChange={changeTeachingOnly} disableRipple style={{padding: '0.5rem 0.5rem'}}/>}
                                      label="Only show courses I am teaching."/>
                </FormGroup>
                <div className="flex flex-col lg:flex-row mx-auto mt-2 gap-2 lg:gap-8">
                    <Button color="info" size="large" className="lg:w-48" type="submit"
                            variant="outlined" onClick={handleFilter}>
                        <FilterAltIcon /> Apply filter
                    </Button>
                    <Button color="error" size="large" className="lg:w-48" type="submit"
                            variant="outlined" onClick={clearFilter}>
                        <Clear /> Clear filter
                    </Button>
                </div>
            </div>
            <div className="rounded-lg border-solid border-2 mt-4 lg:mx-10 extra-wide">
                <ul className="overflow-y-scroll max-h-80 lg:max-h-96">
                    {courses.map(course =>
                        <li
                            className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                            key={course.course.code + course.semester}
                        >
                            <CourseSemesterItem course={course}/>
                        </li>
                    )}
                    {coursesNoSemester.map(course =>
                        <li
                            className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                            key={course.code}
                        >
                            <CourseItem course={course}/>
                        </li>
                    )}
                </ul>
            </div>

            <div className="teachers-only mt-2">
                <div className="flex flex-col lg:flex-row items-center justify-center block mx-auto">
                    <Link to="/courses/create">
                        <Button color="info" className="w-60" type="button" variant="outlined" sx={{ margin: '1rem' }}>
                            Create new course
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Courses;
