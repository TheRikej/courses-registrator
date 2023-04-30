import createFaculty from '../../src/repositories/faculty/createFaculty';
import prisma from '../../src/repositories/client';

describe('faculty.create test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Create faculty.', async () => {
    const expected = {
        name: 'FI',
        deletedAt: null,
    }
    
    const actual = await createFaculty({
        name: 'FI',
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

});

