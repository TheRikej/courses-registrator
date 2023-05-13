import createFaculty from '../../src/repositories/faculty/createFaculty';
import prisma from '../../src/repositories/client';

describe('faculty.create test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Create an non-existing faculty.', async () => {
    const expected = {
        name: 'PF',
        deletedAt: null,
    }
    
    const actual = await createFaculty({
        name: 'PF',
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

  test('[Failure]: Create an existing faculty.', async () => {
    const actual = await createFaculty({
        name: 'FI',
    });

    if (actual.isOk) {
      throw new Error('Repository call should failed!');
    }

    expect(actual.error.message).toEqual("Faculty with this name already exists!");
  });

});

