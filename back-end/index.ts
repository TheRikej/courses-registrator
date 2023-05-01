import createUser from "./src/repositories/user/createUser";
import addCourseUser from "./src/repositories/user/addCourseUser";
import readSpecificUser from "./src/repositories/user/readSpecificUser";
import createCourse from "./src/repositories/course/createCourse";
import addCourseSemester from "./src/repositories/course/addCourseSemester";
import createSemester from "./src/repositories/semester/createSemester";
import prisma from './src/repositories/client';
import createFaculty from "./src/repositories/faculty/createFaculty";
import addSeminarUser from "./src/repositories/user/addSeminarUser";
import readSpecificFaculty from "./src/repositories/faculty/readSpecificFaculty";
import { SemesterSeason } from '@prisma/client';


const a= 5;

console.log(a);

async function main() {
  const faculty = await createFaculty({
    name: "oko"
  })
  const faculty2 = await readSpecificFaculty({
    name: faculty.isOk ? faculty.value.name : "a",
  })
  console.log(faculty)
  const user1 = await createUser({
    userName: 'thehomelander',
    email: 'homelander@vought.com',
    hashedPassword: '10745cd9b0f85388c7dcf40453a398085563eff44c95e445c620dfdbdc5b87e6',
    salt: 'uK13jaM1Yn5324SGbOWd6w1juIVu29H2mq3Yl3gVlab7zONjrJooL74suvL0shUQR1f9MBwc38E5n3yk2xGeXasZo3NSP7XbO8Zf3mp0ar9v7n52uuJ00ig6P2ZFT0lj',
  });
  const user = await readSpecificUser({
      id: user1.isOk ? user1.value.id : "d",
  });
  console.log(user)
  const course = await createCourse({
    facultyId: faculty.isOk ? faculty.value.id : "a",
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
    id: user.isOk ? user.value.id : "fail",
    enrollCourseId: courseSemester.isOk ? courseSemester.value.id : "fail",
  })
  console.log(courseStudent)
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