import addCourseUser from '../../src/repositories/user/addCourseUser';
import prisma from '../../src/repositories/client';

describe('user.addCourse test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });
  test('[Failure]: Adding an non-existing user to a course', async () => {
    const actual = await addCourseUser({
        id: 'cd3d26c7-a278-4991-a839-dc78e1034eba',
        enrollCourseId: 'cd3d26c7-a278-4991-a839-dc78e1034eba',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('No User found');
  });

  test('[Failure]: Adding an deleted user to a course', async () => {
    const actual = await addCourseUser({
        id: '89bed5cb-2783-4e14-831b-d7577d2cad05',
        enrollCourseId: 'a174c454-60c2-4d08-bab8-8306052bb1ae',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('The user has already been deleted!');
  });

  test('[Failure]: Adding an existing user to a non-existing course', async () => {
    const actual = await addCourseUser({
        id: '89bed5cb-2783-4e14-831b-d7577d2cad05',
        enrollCourseId: 'a174c454-60c2-4d08-bab8-8306052bb1ae',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('No Course found');
  });

  test('[Failure]: Adding an existing user to a deleted course', async () => {
    const actual = await addCourseUser({
        id: '89bed5cb-2783-4e14-831b-d7577d2cad05',
        enrollCourseId: 'a174c454-60c2-4d08-bab8-8306052bb1ae',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('The course has already been deleted!');
  });

  test('[Failure]: Adding a user to a course he is already in', async () => {
    const actual = await addCourseUser({
        id: '89bed5cb-2783-4e14-831b-d7577d2cad05',
        enrollCourseId: 'a174c454-60c2-4d08-bab8-8306052bb1ae',
    });

    if (actual.isOk) {
        throw new Error('Repository call should fail!');
    }

    expect(actual.error.message).toContain('The user has already enrolled in this course!');
  });

});

