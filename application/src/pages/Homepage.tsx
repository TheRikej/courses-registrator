import * as React from 'react';
import {Button, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField} from "@mui/material";
import {Link, Navigate} from "react-router-dom";
import formatSemester from "../utils/semester";
import {useState} from "react";
import {Clear} from "@mui/icons-material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CourseItem from "../components/CourseItem";
import CourseSemesterItem from "../components/CourseSemesterItem";
import { useQuery } from '@tanstack/react-query';
import { FacultyRequests, CourseSemesterRequests, CourseRequests, SemesterRequests, UserRequests } from '../services';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedUserAtom, userAtom } from "../atoms/loggedUser";
import { coursesAtom, coursesSemesterAtom, filterDataAtom } from '../atoms/filterCourse';
import { CoursesFilterData, defaultCoursesFilterData } from '../services/models';
import { coursesSemesterToShowSelector, coursesToShowSelector } from '../selectors/filterCourse';

const Courses = () => {
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }

    const [enrolledOnly, setEnrolledOnly] = useState<boolean>(false);
    const [teachingOnly, setTeachingOnly] = useState<boolean>(false);
    const [filtering, setFiltering] = useState<boolean>(false);
    const globalFilterData = useRecoilValue(filterDataAtom);
    const setGlobalFilterData = useSetRecoilState(filterDataAtom);
    const setCoursesSemester = useSetRecoilState(coursesSemesterAtom);
    const setCourses = useSetRecoilState(coursesAtom);
    const [localFilterData, setLocalFilterData] = React.useState<CoursesFilterData>(
        {
            ...globalFilterData,
        }
    );

    const { data: userInfo } = useQuery({
        queryKey: ['HomepageUser'],
        queryFn: () => UserRequests.getUser(loggedUser?.id === undefined ? "0" : String(loggedUser.id)),
    });


    const { data: coursesNoSemesterResponse } = useQuery({
        queryKey: ['HomepageCourseSemester'],
        queryFn: () => CourseRequests.getCourses(),
    });
    React.useEffect(() => {
        setCourses(coursesNoSemesterResponse?.data === undefined ? [] : coursesNoSemesterResponse.data);
    }, []);
    const coursesNoSemester = useRecoilValue(coursesToShowSelector);


    const { data: coursesResponse } = useQuery({
        queryKey: ['HomepageCourseSemesters'],
        queryFn: () => CourseSemesterRequests.getCourseSemesters(),
    });
    React.useEffect(() => {
        setCoursesSemester(coursesResponse?.data === undefined ? [] : coursesResponse.data);
    }, []);
    const courses = useRecoilValue(coursesSemesterToShowSelector);


    const { data: semesters } = useQuery({
        queryKey: ['HomepageSemesters'],
        queryFn: () => SemesterRequests.getSemesters(),
    })

    const { data: faculties } = useQuery({
        queryKey: ['homePageFaculties'],
        queryFn: () => FacultyRequests.getFaculties(),
    });

    console.log(coursesNoSemester);
    console.log(coursesResponse);

    React.useEffect(() => {
        if (filtering) {
            setFiltering(false);
        } else {
            setLocalFilterData({ ...globalFilterData });
        }
    }, [globalFilterData]);

    React.useEffect(() => {
        if (filtering) {
            setGlobalFilterData(
                {
                    ...localFilterData,
                    endrolled: enrolledOnly,
                    teaching: teachingOnly
                }
            );
        }
    }, [filtering]);


    const changeEnrolledOnly = () => {
        setEnrolledOnly(!enrolledOnly);
    }

    const changeTeachingOnly = () => {
        setTeachingOnly(!teachingOnly);
    }

    const handleFilter = () => {
        setFiltering(true);
    };

    const clearFilter = () => {
        setFiltering(false);
        setGlobalFilterData({...defaultCoursesFilterData});
        setEnrolledOnly(false);
        setTeachingOnly(false);
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
                            defaultValue = "_None_"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setLocalFilterData((prev) => ({
                                        ...prev,
                                        semester: event.target.value
                                    }));
                                }
                            }
                            value={
                                localFilterData.semester
                            }
                        >
                            <MenuItem key={0} value={"_None_"}>
                                None
                            </MenuItem>
                            <MenuItem key={1} value={"_Any_"}>
                                Any semester
                            </MenuItem>
                            {semesters?.data.map((option) => (
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
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setLocalFilterData((prev) => ({
                                        ...prev,
                                        faculty: event.target.value
                                    }));
                                }
                            }
                            value={
                                localFilterData.faculty
                            }
                        >
                            <MenuItem key={0} value={"_All_"}>
                                All faculties
                            </MenuItem>
                            {faculties?.data.map((option) => (
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
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            setLocalFilterData((prev) => ({
                                ...prev,
                                nameCode: event.target.value
                            }));
                        }
                    }
                    value={
                        localFilterData.nameCode === null ? '' : localFilterData.nameCode
                    }
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
                    {courses?.map(course =>
                        <li
                            className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                            key={course.course.code + course.semesterYear + "/" + course.semesterSeason}
                        >
                            <CourseSemesterItem course={course}/>
                        </li>
                    )}
                    {coursesNoSemester?.map(course =>
                        <li
                            className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                            key={course.id}
                        >
                            <CourseItem course={course}/>
                        </li>
                    )}
                </ul>
            </div>

            {(loggedUser.admin || loggedUser.teacher) ?
                <div className="mt-2">
                    <div className="flex flex-col lg:flex-row items-center justify-center block mx-auto">
                        <Link to="/courses/create">
                            <Button color="info" className="w-60" type="button" variant="outlined" sx={{ margin: '1rem' }}>
                                Create new course
                            </Button>
                        </Link>
                    </div>
                </div>
            : <></>}
        </div>
    );
};

export default Courses;
