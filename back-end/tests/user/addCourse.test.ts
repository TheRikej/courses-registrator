import addCourseUser from '../../src/repositories/user/courseUser/addCourseUser';
import prisma from '../../src/repositories/client';

describe('user.addCourse test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });
  test('[Failure]: Adding an non-existing user to a course', async () => {
    const actual = await addCourseUser({
        id: 555,
        enrollCourseId: 'cd3d26c7-a278-4991-a839-dc78e1034eba',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('No User found');
  });

  test('[Failure]: Adding an deleted user to a course', async () => {
    const actual = await addCourseUser({
        id: 4,
        enrollCourseId: 'a174c454-60c2-4d08-bab8-8306052bb1ae',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('The user has already been deleted!');
  });

  test('[Failure]: Adding an existing user to a non-existing course', async () => {
    const actual = await addCourseUser({
        id: 1,
        enrollCourseId: 'a174c454-60c2-4d08-bab8-8306052bb1ae',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('No CourseSemester found');
  });

  test('[Failure]: Adding an existing user to a deleted course', async () => {
    const actual = await addCourseUser({
        id: 1,
        enrollCourseId: '86bdeee3-90e9-4d00-89f3-96038b41a5b8',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('The CourseSemester has already been deleted!');
  });

});

