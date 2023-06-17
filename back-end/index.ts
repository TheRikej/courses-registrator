import prisma from './src/repositories/client';
import createUser from './src/repositories/user/createUser';
import readAllSemester from './src/repositories/semester/readAllSemester';

// Here you can try prisma functions.

async function main() {

  /*const facultys = await createFaculty({
    name: "okoa"
  })*/

  /*const faculty2 = await readSpecificFaculty({
    name: "okoa",
  })
  const user1 = await createUser({
    userName: 'thehomelander',
    email: 'homelander@vought.com',
    hashedPassword: '10745cd9b0f85388c7dcf40453a398085563eff44c95e445c620dfdbdc5b87e6',
    salt: 'uK13jaM1Yn5324SGbOWd6w1juIVu29H2mq3Yl3gVlab7zONjrJooL74suvL0shUQR1f9MBwc38E5n3yk2xGeXasZo3NSP7XbO8Zf3mp0ar9v7n52uuJ00ig6P2ZFT0lj',
  });
  const user = await readSpecificUser({
      id: user1.isOk ? user1.value.id : "fail",
  });
  console.log(user)
  const d = await createCourse({
    facultyId: faculty2.isOk ? faculty2.value.id : "fail",
    name: "FsBIO",
    description: "adsss",
    id: "dasdasddddasaadsssd",
    credits: 5,
  });
  console.log(d);
  const semester = await createSemester({
    year: 2022,
    season: SemesterSeason.SPRING,
    semesterEnd: new Date(),
    semesterStart: new Date()
  })
  console.log(semester);
  const courseSemester = await addCourseSemester({
    semesterId: semester.isOk ? semester.value.id : "fail",
    id: d.isOk ? d.value.id : "fail",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
  });
  console.log(courseSemester);
  const courseStudent = await addCourseUser({
    id: user.isOk ? user.value.id : "fail",
    enrollCourseId: courseSemester.isOk ? courseSemester.value.id : "fail",
  })
  console.log(courseStudent)*/
  /*const removedCourseUser = await removeCourseUser({
    id: "1c6eb40c-d104-4893-9cf3-97bcca877001",
    enrollCourseId: "c83f6214-aa2e-43a7-94e8-007e4ce40c20"
  })
  console.log(removedCourseUser)*/
  /*const semester = await createSemester({
    year: 2005,
    season: SemesterSeason.SPRING,
    semesterEnd: new Date(),
    semesterStart: new Date()
  })*/
  /*console.log(semester);
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
  console.log(courseStudent)*/
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
  /*console.log(await readAllSemesterCourses({ 
    facultyId: "aaa"
  }));
  const faculty = await createFaculty({
    name: "okoa"
  })/*
  //console.log(await readSpecificCourse({ id: "92d2defd-49e9-401e-ae14-6e10c986d3d1" }));
  //console.log(await readSpecificSemesterCourse({ id: "13a930a0-4486-4dd4-b821-3e11e2d9aee6" }));
  /*const seminar = await createSeminarGroup({
    courseSemesterId: "86adeee3-90e9-4d00-89f3-96038b41a5b8",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
  });
  console.log(seminar);*/
  /*const courseSemester = await addCourseSemester({
    semesterId: "ba0839d3-eee0-494e-b271-2fac92497d73",
    id: "b1b10604-3564-4115-b05d-c0db7f30d5f2",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
  });
  console.log(courseSemester);
  const courseStudent = await addCourseUser({
    id: "3a9ff983-2b24-496a-a82e-aa7458a9227f",
    enrollCourseId: "bbfa9529-be79-4a9c-b960-46623ee9a2e5",
  })*/
  /*const seminar = await createSeminarGroup({
    courseSemesterId: "bbfa9529-be79-4a9c-b960-46623ee9a2e5",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
  });*/
  //console.log(seminar);
  /*const seminar = await createSeminarGroup({
    courseSemesterId: "74951a79-e4e3-4e0c-ba4f-4d7254dec222",
    registrationEnd: new Date("2025-01-16"),
    registrationStart: new Date("2019-01-16"),
    capacity: 5,
    room: "ss",
    groupNumber: 2,
    timeslot: {
      day: Day.MONDAY,
      endHour: 2,
      endMinute: 1,
      startHour: 2,
      startMinute: 4,
    }
    });
    console.log(seminar)

  //console.log(seminar);*/
  //console.log(user2);
  /*const removedCourseUser = await removeSeminarUser({
    id: "3a9ff983-2b24-496a-a82e-aa7458a9227f",
    seminarId: "0a84fff1-36c7-4d39-be85-a31b1de383c8"
  })
  console.log(removedCourseUser)*/
  /*const upd = await updateSeminar({
    id: "b43f977e-c5c5-4568-837c-be880c141abe",
    room: "dsad",
    capacity: 545,
    registrationEnd: new Date("2028-01-16"),
  })
  console.log(upd)
  const usr = await deleteUser({
    id: "62905279-56ac-4c3a-a22d-6da9e1ae508a",
  })
  console.log(usr)*/
  /*const user1 = await createUser({
    userName: 'thehomelander',
    email: 'homer@vught.cdom',
    teacher: true,
    student: true,
    admin: true,
    hashedPassword: '10745cd9b0f85388c7dcf40453a398085563eff44c95e445c620dfdbdc5b87e6',
  });*/
  /*const user2 = await login({
    id: user1.isOk ? user1.value.id : "fail",
    password: '10745cd9b0f85388c7dcf40453a398085563eff44c95e445c620dfdbdc5b87e6',
  });*/
  //console.log(user1)
  const users = await readAllSemester({});
  console.log(users)
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