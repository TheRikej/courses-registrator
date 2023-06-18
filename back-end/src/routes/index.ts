import express from 'express';
import API from "../controllers"
import type { Request, Response } from 'express';
import auth from '../middleware/authMiddleware';

const router = express.Router();

const home = async (req: Request, res: Response) => {
return res.status(200).send({
    status: 'success',
    data: "Yeeeeey",
  });
}

router.get("/", home);

router.get("/user", auth({admin: true}), API.user.readUserAll)
router.post("/user", auth({admin: true}), auth({}), API.user.createUser)
router.get("/user/:id", auth({}), API.user.readUserSpecific)
router.delete("/user/:id", auth({admin: true}), API.user.deleteUser)

router.post("/course", auth({teacher: true}), API.course.createCourse)
router.get("/course", API.course.readCourseAll)
router.get("/course/:id", auth({}), API.course.readCourseSpecific)
router.delete("/course/:id", auth({teacher: true}), API.course.deleteCourse)
router.put("/course/:id", auth({teacher: true}), API.course.updateCourse)

router.post("/course/:id/courseSemester", auth({teacher: true}), API.courseSemester.createCourseSemester)
router.get("/courseSemester", auth({}), API.courseSemester.readCourseSemesterAll)
router.get("/courseSemester/:id", auth({student: true}), API.courseSemester.readCourseSemesterSpecific.studentReadCourseSemesterSpecificAPI)
router.get("/courseSemester/:id/teacher", auth({teacher: true}), API.courseSemester.readCourseSemesterSpecific.readCourseSemesterSpecificAPI)
router.delete("/courseSemester/:id", auth({teacher: true}), API.courseSemester.deleteCourseSemester)
router.put("/courseSemester/:id", auth({teacher: true}), API.courseSemester.updateCourseSemester)

router.post("/faculty", auth({admin: true}), API.faculty.createFaculty)
router.get("/faculty", API.faculty.readFacultyAll)
router.get("/faculty/:id", API.faculty.readFacultySpecific)
router.delete("/faculty/:id", auth({admin: true}), API.faculty.deleteFaculty)

router.post("/semester", auth({admin: true}), API.semester.createSemester)
router.get("/semester", API.semester.readSemesterAll)
router.get("/semester/:id", API.semester.readSemesterSpecific)
router.delete("/semester/:id", auth({admin: true}), API.semester.deleteSemester)

router.post("/courseSemester/:id/seminar", auth({teacher: true}), API.seminar.createSeminar)
router.get("/courseSemester/:id/seminar/teacher", auth({teacher: true}), API.seminar.readAllSeminar.readSeminarAllAPI)
router.get("/courseSemester/:id/seminar", auth({student: true}), API.seminar.readAllSeminar.studentReadSeminarAllAPI)
router.delete("/seminar/:id", auth({teacher: true}), API.seminar.deleteSeminar)
router.put("/seminar/:id", auth({teacher: true}), API.seminar.updateSeminar)

router.put("/courseSemester/:enrollCourseId/teacher/:id", auth({teacher: true}), API.user.addCourseTeacher)
router.delete("/courseSemester/:courseId/teacher/:id", auth({teacher: true}), API.user.removeCourseTeacher)

router.put("/courseSemester/:enrollCourseId/student/:id", auth({student: true}), API.user.addCourseStudent)
router.delete("/courseSemester/:enrollCourseId/student/:id", auth({student: true}), API.user.removeCourseStudent)

router.put("/seminar/:enrollSeminarId/teacher/:id", auth({teacher: true}), API.user.addSeminarTeacher)
router.delete("/seminar/:seminarId/teacher/:id", auth({teacher: true}), API.user.removeSeminarTeacher)

router.put("/seminar/:enrollSeminarId/student/:id", auth({student: true}), API.user.addSeminarStudent)
router.delete("/seminar/:seminarId/student/:id", auth({student: true}), API.user.removeSeminarStudent)

router.get("/login", API.user.login)

export default router;
