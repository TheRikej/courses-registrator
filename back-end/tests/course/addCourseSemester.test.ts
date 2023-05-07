import addCourseSemester from '../../src/repositories/course/addCourseSemester';
import prisma from '../../src/repositories/client';

describe('course.create test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Add course semester.', async () => {
    
    const expected = {
        name: 'PB138',
        description: 'Moderni znackovaci jazyky',
        deletedAt: null,
    }
    
    const actual = await addCourseSemester({
        id: 'a',
        semesterId: 'a',
        registrationStart: new Date(),
        registrationEnd: new Date(),
        capacity: 100
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

});

