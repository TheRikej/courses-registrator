import { Result } from '@badrap/result';
import prisma from '../client';
import type { DeleteData } from './types/data';
import type { SeminarDeleteResult } from './types/result';
import { AuthorizationFailedError, DeletedRecordError, NonexistentRecordError } from '../errors';


const deleteSeminarGroup = async (data: DeleteData): SeminarDeleteResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const deletedAt = new Date();
        const group = await transaction.seminarGroup.findUnique({
          where: {
            id: data.id,
          },
          include: {
            students: true,
            teachers: true,
            courseSemester: {
                include: {
                    teachers: true,
                    course: true,
                }
            }
          }
        });
        if (group === null) {
          throw new NonexistentRecordError('No group found');
        }
        if (group.deletedAt !== null) {
          throw new DeletedRecordError('The group has already been deleted!');
        }
        if ( !data.loggedInUser.admin
            && !group.teachers.map(x => x.id).includes(data.loggedInUser.id)
            && group.courseSemester.course.guarantorId !== data.loggedInUser.id
            && !group.courseSemester.teachers.map(x => x.id).includes(data.loggedInUser.id)) {
           throw new AuthorizationFailedError("You don't have rights to delete this seminar")
       }

        const deleted = await transaction.seminarGroup.update({
          where: {
            id: data.id,
          },
          data: {
            deletedAt,
          },
          include: {
            students: true,
            teachers: true,
          },
        });
        return deleted;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteSeminarGroup;
