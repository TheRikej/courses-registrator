import createUser from '../../src/repositories/user/createUser';
import prisma from '../../src/repositories/client';

describe('user.comment test suite', () => {
  beforeEach(async () => {
    await prisma.$disconnect();
  });

  test('[Success]: Create user', async () => {
    const expected = {
      userName: '958597',
      email: 'test@example.com',
      hashedPassword: 'asdadddddddddd',
      salt: 'salt',
      deletedAt: null,
    }
    
    const actual = await createUser(
      {
        userName: '958597',
        email: 'test@example.com',
        hashedPassword: 'asdadddddddddd',
        salt: 'salt'
      }
    );

    if (actual.isErr) {
      throw new Error('Repository call should succeed!');
    }

    expect(actual.value).toStrictEqual(expect.objectContaining({...expected}));
  });

  test('[Failure]: Create user with invalid email', async () => {
    const actual = await createUser(
      {
        userName: '958597',
        email: 'testexample.com',
        hashedPassword: 'asdadddddddddd',
        salt: 'salt'
      }
    );

    if (!actual.isErr) {
      throw new Error('Repository call should failed!');
    }
  });
});

