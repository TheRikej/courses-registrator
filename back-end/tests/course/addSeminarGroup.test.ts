//import addSeminarGroup from '../../src/repositories/course/addSeminarGroup';
import prisma from '../../src/repositories/client';

describe('course.addSeminarGroup test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

});

