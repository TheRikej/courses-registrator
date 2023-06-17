import createUser from "./createUserAPI"
import readUserAll from "./readUserAllAPI"
import readUserSpecific from "./readUsersSpecific"
import deleteUser from "./deleteUserAPI"

import addCourseStudent from "./courseStudent/addCourseStudentAPI"
import removeCourseStudent from "./courseStudent/removeCourseStudentAPI"

import addCourseTeacher from "./courseTeacher/addCourseTeacherAPI"
import removeCourseTeacher from "./courseTeacher/removeCourseTeacherAPI"

import addSeminarStudent from "./seminarStudent/addSeminarStudentAPI"
import removeSeminarStudent from "./seminarStudent/removeSeminarStudentAPI"

import addSeminarTeacher from "./seminarTeacher/addSeminarTeacherAPI"
import removeSeminarTeacher from "./seminarTeacher/removeSeminarTeacherAPI"
import updateUserStatus from "./updateUser"


export default {
    createUser,
    readUserAll,
    readUserSpecific,
    deleteUser,
    addCourseStudent,
    removeCourseStudent,
    addCourseTeacher,
    removeCourseTeacher,
    addSeminarStudent,
    removeSeminarStudent,
    addSeminarTeacher,
    removeSeminarTeacher,
    updateUserStatus,
}