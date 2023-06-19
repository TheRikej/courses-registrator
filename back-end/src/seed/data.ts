import type { User, Course, Semester, CourseSemester, Faculty } from '@prisma/client';

const usersData: User[] = [
    {
        "id": 1,
        "userName": "john",
        "email": "j.hill@scada.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "deletedAt": null,
        "teacher": true,
        "student": true,
        "administrator": true,
    },
    {
        "id": 2,
        "userName": "john",
        "email": "j.hill@scada2.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "deletedAt": null,
        "teacher": true,
        "student": true,
        "administrator": true,
    },
    {
        "id": 3,
        "userName": "john",
        "email": "j.hill@scada3.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "deletedAt": null,
        "teacher": true,
        "student": true,
        "administrator": true,
    },
    {
        "id": 4,
        "userName": "john",
        "email": "j.hill@scada4.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "deletedAt": new Date('2023-03-17T13:00:06.000Z'),
        "teacher": true,
        "student": true,
        "administrator": true,
    }
]

const facultyData: Faculty[] = [
    {
        "id": "aaa",
        "name": "FI",
        "deletedAt": null,
    },
    {
        "id": "bbb",
        "name": "FSS",
        "deletedAt": null,
    },
    {
        "id": "ccc",
        "name": "FF",
        "deletedAt": null,
    },
]

const coursesData: Course[] = [
    {
        "id": "PB11",
        "description": "Moderni Znackovaci Jazyky",
        "name": "PB138",
        "deletedAt": null,
        "facultyId": "aaa",
        "credits": 5,
        "guarantorId": 1,
    },
    {
        "id": "a8b45ee3-f110-4265-a527-6fba4447d2c8",
        "description": "Algoritmy",
        "name": "IB001",
        "deletedAt": null,
        "facultyId": "bbb",
        "credits": 5,
        "guarantorId": 1,
    },
    {
        "id": "49c1af40-35d9-48a4-9695-d7f164071f30",
        "description": "Matematika 1",
        "name": "MB144",
        "deletedAt": null,
        "facultyId": "ccc",
        "credits": 5,
        "guarantorId": 1,
    }
]

const semestersData: Semester[] = [
    {
        "id": "42e0cd59-ae5b-46af-9fdb-aa0f642e1dc1",
        "year": 2023,
        "season": "SPRING",
        "semesterStart": new Date('2023-03-17T13:00:06.000Z'),
        "semesterEnd": new Date('2023-03-17T13:00:06.000Z'),
        "deletedAt": null
    },
    {
        "id": "ba0839d3-eee0-494e-b271-2fac92497d73",
        "year": 2022,
        "season": "FALL",
        "semesterStart": new Date('2023-03-17T13:00:06.000Z'),
        "semesterEnd": new Date('2023-03-17T13:00:06.000Z'),
        "deletedAt": null
    },
    {
        "id": "99e68201-76a5-4b02-9379-4277deda8a70",
        "year": 2023,
        "season": "SPRING",
        "semesterStart": new Date('2023-03-17T13:00:06.000Z'),
        "semesterEnd": new Date('2023-03-17T13:00:06.000Z'),
        "deletedAt": new Date('2023-03-17T13:00:06.000Z'),
    }
]

const courseSemesterData: CourseSemester[] = [
    {
        "id": "86adeee3-90e9-4d00-89f3-96038b41a5b8",
        "registrationStart": new Date('2023-03-17T13:00:06.000Z'),
        "registrationEnd": new Date('2023-03-17T13:00:06.000Z'),
        "capacity": 200,
        "courseId": "PB11",
        "semesterId": "42e0cd59-ae5b-46af-9fdb-aa0f642e1dc1",
        "deletedAt": null,
        "room": "a",
        "timeSlotId": null,
    },
    {
        "id": "86bdeee3-90e9-4d00-89f3-96038b41a5b8",
        "registrationStart": new Date('2023-03-17T13:00:06.000Z'),
        "registrationEnd": new Date('2023-03-17T13:00:06.000Z'),
        "capacity": 200,
        "courseId": "PB11",
        "semesterId": "99e68201-76a5-4b02-9379-4277deda8a70",
        "deletedAt": new Date('2023-03-17T13:00:06.000Z'),
        "room": "a",
        "timeSlotId": null,
    }
]


export default {
    usersData,
    semestersData,
    coursesData,
    courseSemesterData,
    facultyData
};
