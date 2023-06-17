import { CourseApiResult } from '../models/courses/api';
import { selector } from 'recoil';
import { coursesAtom, filterDataAtom } from './atoms';

export const coursesToShowSelector = selector<CourseApiResult[]>({
    key: 'coursesToShow',
    get: ({ get }) => {
        const courses = get(coursesAtom)
        const filterData = get(filterDataAtom);

        const filteredCourses = courses.filter(
            (course) =>
                true
                // TODO: filter data
        );
        return filteredCourses;
    },
});