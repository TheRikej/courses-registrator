import createUser from "./src/repositories/user/createUser";
import addCourseUser from "./src/repositories/user/courseUser/addCourseUser";
import readSpecificUser from "./src/repositories/user/readSpecificUser";
import createCourse from "./src/repositories/course/createCourse";
import addCourseSemester from "./src/repositories/course/addCourseSemester";
import createSemester from "./src/repositories/semester/createSemester";
import prisma from './src/repositories/client';
import createFaculty from "./src/repositories/faculty/createFaculty";
import addSeminarUser from "./src/repositories/user/seminarUser/addSeminarUser";
import readSpecificFaculty from "./src/repositories/faculty/readSpecificFaculty";
import { SemesterSeason } from '@prisma/client';
import removeCourseUser from "./src/repositories/user/courseUser/removeCourseUser";
import readSpecificSemester from "./src/repositories/semester/readSpecificSemester";
import readAllSemester from "./src/repositories/semester/readAllSemester";
import readAllFaculty from "./src/repositories/faculty/readAllFaculty";
import readAllUser from "./src/repositories/user/readAllUser";
import addCourseTeacher from "./src/repositories/user/courseTeacher/addCourseTeacher";
import createSeminarGroup from "./src/repositories/seminar/createSeminarGroup";
import addSeminarTeacher from "./src/repositories/user/seminarTeacher/addSeminarTeacher";
import removeCourseTeacher from "./src/repositories/user/courseTeacher/removeCourseTeacher";
import readAllSemesterCourses from "./src/repositories/courseSemester/readAllSemesterCourses";
import readAllCourse from "./src/repositories/course/readAllCourses";
import readSpecificSemesterCourse from "./src/repositories/courseSemester/readSpecificSemesterCourse";
import readSpecificCourse from "./src/repositories/course/readSpecificCourse";

// Here you can try prisma functions.

async function main() {
  /* const faculty = await createFaculty({
    name: "okoa"
  })
  const faculty2 = await readSpecificFaculty({
    name: "okoa",
  })
  console.log(faculty)
  const user1 = await createUser({
    userName: 'thehomelander',
    email: 'homelander@vought.com',
    hashedPassword: '10745cd9b0f85388c7dcf40453a398085563eff44c95e445c620dfdbdc5b87e6',
    salt: 'uK13jaM1Yn5324SGbOWd6w1juIVu29H2mq3Yl3gVlab7zONjrJooL74suvL0shUQR1f9MBwc38E5n3yk2xGeXasZo3NSP7XbO8Zf3mp0ar9v7n52uuJ00ig6P2ZFT0lj',
  });
  const user = await readSpecificUser({
      id: "1c6eb40c-d104-4893-9cf3-97bcca877001",
  });
  console.log(user)
  const course = await createCourse({
    facultyId: faculty2.isOk ? faculty2.value.id : "a",
    name: "FBIO",
    description: "ads",
  });
  console.log(course);
  const semester = await createSemester({
    year: 2001,
    season: SemesterSeason.SPRING,
    semesterEnd: new Date(),
    semesterStart: new Date()
  })
  console.log(semester);
  const courseSemester = await addCourseSemester({
    semesterId: semester.isOk ? semester.value.id : "fail",
    id: course.isOk ? course.value.id : "fail",
    registrationEnd: new Date(),
    registrationStart: new Date(),
    capacity: 5,
  });
  console.log(courseSemester);
  const courseStudent = await addCourseUser({
    id: "1c6eb40c-d104-4893-9cf3-97bcca877001",
    enrollCourseId: "c83f6214-aa2e-43a7-94e8-007e4ce40c20",
  })
  console.log(courseStudent)
  const removedCourseUser = await removeCourseUser({
    id: "1c6eb40c-d104-4893-9cf3-97bcca877001",
    enrollCourseId: "c83f6214-aa2e-43a7-94e8-007e4ce40c20"
  })
  console.log(removedCourseUser)
  const semester = await createSemester({
    year: 2005,
    season: SemesterSeason.SPRING,
    semesterEnd: new Date(),
    semesterStart: new Date()
  })
  console.log(semester);
  const semesters = await readAllFaculty();
  console.log(semesters);
  const semesters2 = await readAllSemester({
    season: SemesterSeason.FALL
  })
  console.log(semesters2);
  const semesters3 = await readSpecificSemester({
    id: "e2a7064e-e1b2-467f-8ac4-516441c5f429"
  })
  console.log(semesters3);
  const users = await readAllUser()
  console.log(users);
  const courseSemester = await addCourseSemester({
    semesterId: semesters3.isOk ? semesters3.value.id : "fail",
    id: "a8b45ee3-f110-4265-a527-6fba4447d2c8",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
  });
  const courseStudent = await addCourseUser({
    id: "1c6eb40c-d104-4893-9cf3-97bcca877001",
    enrollCourseId: courseSemester.isOk ? courseSemester.value.id : "fail",
  })
  console.log(courseSemester)
  console.log(courseStudent)
  // new Date("2019-01-16");*/
  /*const courseSemester = await addCourseTeacher({
    enrollCourseId: "86adeee3-90e9-4d00-89f3-96038b41a5b8",
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
  });
  console.log(courseSemester);*/
  /*const courseSemester = await addCourseTeacher({
    enrollCourseId: "86adeee3-90e9-4d00-89f3-96038b41a5b8",
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
  });*/
  /*const newCourseSemester = await addCourseSemester({
    semesterId: "99e68201-76a5-4b02-9379-4277deda8a70",
    id: "a8b45ee3-f110-4265-a527-6fba4447d2c8",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
  });
  const seminar = await createSeminarGroup({
    courseSemesterId: newCourseSemester.isOk ? newCourseSemester.value.id : "fail",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
  });
  const courseSemester = await addCourseTeacher({
    enrollCourseId: newCourseSemester.isOk ? newCourseSemester.value.id : "fail",
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
  });
  const user = await readSpecificUser({
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
  })
  const user2 = await addSeminarTeacher({
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
    enrollSeminarId: seminar.isOk ? seminar.value.id : "fail",
  })
  const user3 = await readSpecificUser({
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
  })*/
  /*console.log(courseSemester);
  console.log(seminar);
  console.log(user);
  console.log(user2);
  console.log(user3);*/
  /*const courseSemester2 = await removeCourseTeacher({
    courseId: "452c3db3-d6c9-45db-b0b9-f7baa86455cb",
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
  });
  const user4 = await readSpecificUser({
    id: "14c458ce-57be-433c-98b0-9888d14f41af",
  })
  console.log(courseSemester2);
  console.log(user4);*/
  //console.log(await readAllCourse({ facultyId: "aaa" }));
  //console.log(await readAllSemesterCourses({}));
  //console.log(await readSpecificCourse({ id: "92d2defd-49e9-401e-ae14-6e10c986d3d1" }));
  console.log(await readSpecificSemesterCourse({ id: "13a930a0-4486-4dd4-b821-3e11e2d9aee6" }));
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

//console.log(showcaseRepositories())