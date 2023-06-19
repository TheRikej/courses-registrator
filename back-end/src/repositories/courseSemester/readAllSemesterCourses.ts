import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadAllCourseSemesterData } from './types/data';
import type { AllCourseSemesterResult } from './types/result';

/**
 * Returns all SemesterCourses that fit the given conditions.
 * 
 * @param data 
 * @returns 
 */
const readAllSemesterCourses = async (
    data: ReadAllCourseSemesterData,
  ): AllCourseSemesterResult => {
    try {
      return Result.ok(
        await prisma.$transaction(async (transaction) => {
          const courses = await transaction.course.findMany({
            where: {
              ...(data.facultyId !== undefined ? { facultyId: data.facultyId } : {}),
              deletedAt: null
            },
          });
          const courseIds = courses.map(x => x.id);
          const course = await transaction.courseSemester.findMany({
            where: {
              ...(data?.courseId !== undefined ? { courseId: data.courseId} : {}),
              ...(data?.semesterId !== undefined ? { semesterId: data.semesterId} : {}),
              courseId: { in: courseIds },
            },
            include: {
              semester: true,
              course: {
                include: {
                  faculty: true,
                }
              },
              teachers: true,
              students: true,
            }
          });
          const coursesWithCapacity = course.map(x => ({
            course: {
              code: x.course.id,
              name: x.course.name,
              description: x.course.description,
              guarantor: x.course.guarantorId,
              credits: x.course.credits,
              faculty: x.course.faculty.name,
            },
            id: x.id,
            semesterSeason: x.semester.season,
            semesterYear: x.semester.year,
            capacity: x.students.length,
            maxCapacity: x.capacity,
            registrationEnd: x.registrationEnd,
            registrationStart: x.registrationStart,
            room: x.room,
            teachers: x.teachers.map(x => x.userName),
          }));
          return coursesWithCapacity;
        }),
      );
      
      //return Result.ok(course);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllSemesterCourses;