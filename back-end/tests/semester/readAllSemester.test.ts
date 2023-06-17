import readAllSemester from '../../src/repositories/semester/readAllSemester';
import prisma from '../../src/repositories/client';

describe('semester.readAllSemester test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Read all semesters.', async () => {
    
    const actual = await readAllSemester({});

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    //expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

});

