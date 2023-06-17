import prisma from '../../src/repositories/client';
import createSemester from '../../src/repositories/semester/createSemester';

describe('semester.readSpecificSemester test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Create semester.', async () => {
    const expected = {
        year: 2027,
        season: "SPRING",
        semesterStart: new Date(2027, 2, 15),
        semesterEnd: new Date(2027, 5, 22),
        deletedAt: null,
    }
    
    const actual = await createSemester({
        year: 2027,
        season: "SPRING",
        semesterStart: new Date(2027, 2, 15),
        semesterEnd: new Date(2027, 5, 22),
    });

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

  test('[Failure]: Create existing semester.', async () => {
    const actual = await createSemester({
        year: 2023,
        season: "SPRING",
        semesterStart: new Date(2023, 2, 15),
        semesterEnd: new Date(2023, 5, 22),
    });

    if (actual.isOk) {
      throw new Error('Repository call should failed!');
    }

    expect(actual.error.message).toStrictEqual("There already is semester of this year and season!");
  });

});

