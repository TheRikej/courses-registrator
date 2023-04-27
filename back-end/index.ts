import createUser from "./src/repositories/user/createUser";
import addCourseUser from "./src/repositories/user/addCourseUser";
import readSpecificUser from "./src/repositories/user/readSpecificUser";
import createCourse from "./src/repositories/course/createCourse";
import prisma from './src/repositories/client';


const a= 5;

console.log(a);

async function main() {
    const user = await readSpecificUser({
        userName: 'the.mf.billy.butcher',
    });
    console.log(user)
    const course = await createCourse({
      name: "FBIO",
      description: "ads", 
      registrationStart: new Date(), 
      capacity: 2
    });
    let id;
    if (user.isOk && course.isOk) {
      id = user.value.id
      const eid = course.value.id
      const courseStudent = await addCourseUser({
        id,
        enrollCourseId: eid
      });
      console.log(courseStudent)
    }

    console.log(course)
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