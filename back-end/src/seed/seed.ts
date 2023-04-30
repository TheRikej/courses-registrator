import client from '../repositories/client';
import data from './data';

const seed = async () => {
    console.log(`[${new Date().toISOString()}] Seed started`);
    
    console.log(`[${new Date().toISOString()}] Seeding Users`);
    await client.$transaction([
      ...data.usersData.map((user) => (
        client.user.create({
          data: {
            ...user,
          },
        })
      )),
    ]);

    console.log(`[${new Date().toISOString()}] Seeding Semesters`);
    await client.$transaction([
      ...data.semestersData.map((semester) => (
        client.semester.create({
          data: {
            ...semester,
          },
        })
      )),
    ]);

    console.log(`[${new Date().toISOString()}] Seeding Courses`);
    await client.$transaction([
      ...data.coursesData.map((course) => (
        client.course.create({
          data: {
            ...course,
          },
        })
      )),
    ]);

    console.log(`[${new Date().toISOString()}] Seeding courseSemester`);
    await client.$transaction([
      ...data.courseSemesterData.map((courseSemester) => (
        client.courseSemester.create({
          data: {
            ...courseSemester,
          },
        })
      )),
    ]);
  };
  
  seed().then(() => {
    console.log(`[${new Date().toISOString()}] Seed succeeded`);
  }).catch((e) => {
    console.log(`[${new Date().toISOString()}] Seed failed`);
    console.log(e);
  }).finally(async () => {
    await client.$disconnect();
  });
  