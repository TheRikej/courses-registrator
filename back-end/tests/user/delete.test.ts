import deleteUser from '../../src/repositories/user/deleteUser';
import prisma from '../../src/repositories/client';

describe('user.comment test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });
  
});

