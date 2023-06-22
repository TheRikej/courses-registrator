import { selector } from 'recoil';
import { coursesAtom, coursesSemesterAtom, filterDataAtom } from '../atoms/filterCourse';
import { CourseModel, CourseSemesterModel } from '../services/models';
import { useQuery } from '@tanstack/react-query';
import { userAtom } from '../atoms/loggedUser';

export const coursesSemesterToShowSelector = selector<CourseSemesterModel[]>({
    key: 'coursesSemesterToShow',
    get: ({ get }) => {
        const courses = get(coursesSemesterAtom);
        const filterData = get(filterDataAtom);
        const userData = get(userAtom)

        const filteredSemesterCourses = courses.filter(
            (course) =>
                (filterData.nameCode === "" || course.course.code.includes(filterData.nameCode.toUpperCase()) ||
                course.course.name.toLowerCase().includes(filterData.nameCode.toLowerCase())) &&
                (filterData.faculty === "_All_" || filterData.faculty === course.course.faculty) &&
                (filterData.semester === "_Any_" || filterData.semester === course.semesterSeason.toLowerCase() + String(course.semesterYear)) &&
                (filterData.endrolled === false || (userData !== null && userData.studiedCourses.map(x => x.course.id).includes(course.id))) &&
                (filterData.teaching === false || (userData !== null && userData.taughtCourses.map(x => x.id).includes(course.id))) 
        );
        return filteredSemesterCourses;
    },
});


export const coursesToShowSelector = selector<CourseModel[]>({
    key: 'coursesToShow',
    get: ({ get }) => {
        const courses = get(coursesAtom)
        const filterData = get(filterDataAtom);
        const userData = get(userAtom)

        const filteredCourses = courses.filter(
            (course) =>
                filterData.semester === "_None_" &&
                (filterData.nameCode === "" || course.name.toLowerCase().includes(filterData.nameCode.toLowerCase()) ||
                course.id.includes(filterData.nameCode.toUpperCase())) && 
                (filterData.faculty === "_All_" || filterData.faculty === course.faculty.name) &&
                (filterData.endrolled === false || (userData !== null && userData.studiedCourses.map(x => x.course.course.id).includes(course.id))) &&
                (filterData.teaching === false || (userData !== null && userData.taughtCourses.map(x => x.course.id).includes(course.id))) 
        );
        return filteredCourses;
    },
});