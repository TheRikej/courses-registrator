import addCourseSemester from '../../src/repositories/course/addCourseSemester';
import deleteSemesterCourse from '../../src/repositories/courseSemester/deleteSemesterCourse';
import prisma from '../../src/repositories/client';

describe('course.create test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Add course semester.', async () => {
    const actual = await addCourseSemester({
        id: 'PB11',
        semesterId: 'ba0839d3-eee0-494e-b271-2fac92497d73',
        registrationStart: new Date(),
        registrationEnd: new Date(),
        capacity: 100,
        loggedInUser: {
            id: 1, 
            admin: true,
            teacher: true,
            student: true,
        }
    });

    if (actual.isErr) {
      console.log(actual.error);
      throw new Error('Repository call should succeed!');
    }

    await deleteSemesterCourse({
      id: actual.value.id,
      loggedInUser: {
        id: 1, 
        admin: true,
        teacher: true,
        student: true,
    }
  });

    expect(actual.value.capacity).toStrictEqual(100);
    expect(actual.value.semesterId).toStrictEqual('ba0839d3-eee0-494e-b271-2fac92497d73');
    expect(actual.value.courseId).toStrictEqual('PB11');
  });

});

