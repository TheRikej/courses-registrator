import { selector } from 'recoil';
import { coursesAtom, coursesSemesterAtom, filterDataAtom } from './atoms';
import { CourseModel, CourseSemesterModel } from '../services/models';

export const coursesSemesterToShowSelector = selector<CourseSemesterModel[]>({
    key: 'coursesSemesterToShow',
    get: ({ get }) => {
        const courses = get(coursesSemesterAtom)
        const filterData = get(filterDataAtom);
        const filteredSemesterCourses = courses.filter(
            (course) =>
                (filterData.nameCode === "" || course.course.code.toLowerCase().includes(filterData.nameCode) || course.course.name.toLowerCase().includes(filterData.nameCode)) &&
                (filterData.faculty === "_All_" || filterData.faculty === course.course.faculty) &&
                (filterData.semester === "_Any_" || filterData.semester === course.semesterSeason + String(course.semesterYear))
        );
        return filteredSemesterCourses;
    },
});


export const coursesToShowSelector = selector<CourseModel[]>({
    key: 'coursesToShow',
    get: ({ get }) => {
        const courses = get(coursesAtom)
        const filterData = get(filterDataAtom);

        const filteredCourses = courses.filter(
            (course) =>
                filterData.semester === "_None_" &&
                (filterData.nameCode === "" || course.name.toLowerCase().includes(filterData.nameCode))
        );
        return filteredCourses;
    },
});