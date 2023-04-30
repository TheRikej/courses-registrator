// import addSeminarGroup from '../../src/repositories/course/addSeminarGroup';
import prisma from '../../src/repositories/client';

describe('course.create test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Create course.', async () => {
    return;
  });

});

