import readAllFaculty from '../../src/repositories/faculty/readAllFaculty';
import prisma from '../../src/repositories/client';

describe('faculty.readAllFaculty test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Get all faculties.', async () => {
    
    const actual = await readAllFaculty();

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }
  });

});

