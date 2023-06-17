import express from 'express';
import API from "../controllers"
import type { Request, Response } from 'express';

const router = express.Router();

const home = async (req: Request, res: Response) => {
return res.status(200).send({
    status: 'success',
    data: "Yeeeeey",
  });
}

router.get("/", home);

router.get("/user", API.user.readUserAll)
router.post("/user", API.user.createUser)
router.get("/user/:id", API.user.readUserSpecific)
router.delete("/user/:id", API.user.deleteUser)
router.put("/user/:id", API.user.updateUserStatus)

router.post("/course", API.course.createCourse)
router.get("/course", API.course.readCourseAll)
router.get("/course/:id", API.course.readCourseSpecific)
router.delete("/course/:id", API.course.deleteCourse)
router.put("/course/:id", API.course.updateCourse)

router.post("/course/:id/courseSemester", API.courseSemester.createCourseSemester)
router.get("/courseSemester", API.courseSemester.readCourseSemesterAll)
router.get("/courseSemester/:id", API.courseSemester.readCourseSemesterSpecific.studentReadCourseSemesterSpecificAPI)
router.get("/courseSemester/:id/teacher", API.courseSemester.readCourseSemesterSpecific.readCourseSemesterSpecificAPI)
router.delete("/courseSemester/:id", API.courseSemester.deleteCourseSemester)
router.put("/courseSemester/:id", API.courseSemester.updateCourseSemester)

router.post("/faculty", API.faculty.createFaculty)
router.get("/faculty", API.faculty.readFacultyAll)
router.get("/faculty/:id", API.faculty.readFacultySpecific)
router.delete("/faculty/:id", API.faculty.deleteFaculty)

router.post("/semester", API.semester.createSemester)
router.get("/semester", API.semester.readSemesterAll)
router.get("/semester/:id", API.semester.readSemesterSpecific)
router.delete("/semester/:id", API.semester.deleteSemester)

router.post("/courseSemester/:id/seminar", API.seminar.createSeminar)
router.get("/courseSemester/:id/seminar/teacher", API.seminar.readAllSeminar.readSeminarAllAPI)
router.get("/courseSemester/:id/seminar", API.seminar.readAllSeminar.studentReadSeminarAllAPI)
router.delete("/seminar/:id", API.seminar.deleteSeminar)
router.put("/seminar/:id", API.seminar.updateSeminar)

router.put("/courseSemester/:enrollCourseId/teacher/:id", API.user.addCourseTeacher)
router.delete("/courseSemester/:courseId/teacher/:id", API.user.removeCourseTeacher)

router.put("/courseSemester/:enrollCourseId/student/:id", API.user.addCourseStudent)
router.delete("/courseSemester/:enrollCourseId/student/:id", API.user.removeCourseStudent)

router.put("/seminar/:enrollSeminarId/teacher/:id", API.user.addSeminarTeacher)
router.delete("/seminar/:seminarId/teacher/:id", API.user.removeSeminarTeacher)

router.put("/seminar/:enrollSeminarId/student/:id", API.user.addSeminarStudent)
router.delete("/seminar/:seminarId/student/:id", API.user.removeSeminarStudent)

router.get("/login")

export default router;
