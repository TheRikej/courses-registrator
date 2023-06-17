import readSpecificFaculty from '../../src/repositories/faculty/readSpecificFaculty';
import prisma from '../../src/repositories/client';

describe('faculty.readSpecific test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Get an existing faculty by id.', async () => {
    const expected = {
        id: "aaa",
        name: 'FI',
        deletedAt: null,
    }
    
    const actual = await readSpecificFaculty({
        id: 'aaa',
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

  test('[Success]: Read an existing faculty by name.', async () => {
    const expected = {
        id: "aaa",
        name: 'FI',
        deletedAt: null,
    }

    const actual = await readSpecificFaculty({
        name: 'FI',
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

  test('[Success]: Read an existing faculty by id and name.', async () => {
    const expected = {
        id: "aaa",
        name: 'FI',
        deletedAt: null,
    }

    const actual = await readSpecificFaculty({
        id: "aaa",
        name: 'FI',
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

  test('[Failure]: Read an existing faculty without id and name parameter.', async () => {

    const actual = await readSpecificFaculty({});

    if (actual.isOk) {
      throw new Error('Repository call should failed!');
    }

    expect(actual.error.message).toStrictEqual("Must provide ID or Name for faculty!");
  });

});

