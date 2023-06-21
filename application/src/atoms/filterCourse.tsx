import { atom } from 'recoil';
import { CourseModel, CourseSemesterModel } from '../services/models';
import { defaultCoursesFilterData, CoursesFilterData } from '../services/models';

export const coursesSemesterAtom = atom<CourseSemesterModel[]>({
    key: 'coursesSemester',
    default: []
})

export const coursesAtom = atom<CourseModel[]>({
    key: 'courses',
    default: []
})

export const filterDataAtom = atom<CoursesFilterData>({
    key: 'filterData',
    default: defaultCoursesFilterData
});
