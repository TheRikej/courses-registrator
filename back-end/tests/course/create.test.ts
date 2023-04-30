import createCourse from '../../src/repositories/course/createCourse';
import prisma from '../../src/repositories/client';

describe('course.create test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Create course.', async () => {
    const expected = {
        name: 'PB138',
        description: 'Moderni znackovaci jazyky',
        deletedAt: null,
    }
    
    const actual = await createCourse({
        name: 'PB138',
        description: 'Moderni znackovaci jazyky',
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

});

