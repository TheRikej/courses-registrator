import { atom } from 'recoil';
import {
    defaultCoursesFilterData,
    CoursesFilterData,
} from '../models/courses/courses'
import { CourseApiResult } from '../models/courses/api';

export const coursesAtom = atom<CourseApiResult[]>({
    key: 'courses',
    default: []
})

export const filterDataAtom = atom<CoursesFilterData>({
    key: 'courses',
    default: defaultCoursesFilterData
});
