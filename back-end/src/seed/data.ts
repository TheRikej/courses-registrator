import type { User, Course, Semester, CourseSemester } from '@prisma/client';

const usersData: User[] = [
    {
        "id": "14c458ce-57be-433c-98b0-9888d14f41af",
        "userName": "john",
        "email": "j.hill@scada.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "salt": "JOA0c7xtMB7pV4oPCjnG1djDo7wbhn16zsreKt7wKnOd4o9mXSDg7q2hnX7858ONB2JPg6Y4WR4ambujo175Af6UCKVR3495AE92r47BL5q5nKl6DM802dwI5w85b4JJ",
        "deletedAt": null
    },
    {
        "id": "e33e2798-649f-4e33-905c-cb72e3d52b4c",
        "userName": "john",
        "email": "j.hill@scada.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "salt": "JOA0c7xtMB7pV4oPCjnG1djDo7wbhn16zsreKt7wKnOd4o9mXSDg7q2hnX7858ONB2JPg6Y4WR4ambujo175Af6UCKVR3495AE92r47BL5q5nKl6DM802dwI5w85b4JJ",
        "deletedAt": null
    },
    {
        "id": "464c8d3a-8c3c-43d3-8a67-09554c81dfa6",
        "userName": "john",
        "email": "j.hill@scada.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "salt": "JOA0c7xtMB7pV4oPCjnG1djDo7wbhn16zsreKt7wKnOd4o9mXSDg7q2hnX7858ONB2JPg6Y4WR4ambujo175Af6UCKVR3495AE92r47BL5q5nKl6DM802dwI5w85b4JJ",
        "deletedAt": null
    },
    {
        "id": "ee905e1d-3ab1-448d-99cb-f6f4be0d45d1",
        "userName": "john",
        "email": "j.hill@scada.org",
        "createdAt": new Date('2023-03-17T13:00:06.000Z'),
        "hashedPassword": "9f45cd50672132537264050cd666e6ae5dcc00de78361c2ecdbb6d1847cfe63e",
        "salt": "JOA0c7xtMB7pV4oPCjnG1djDo7wbhn16zsreKt7wKnOd4o9mXSDg7q2hnX7858ONB2JPg6Y4WR4ambujo175Af6UCKVR3495AE92r47BL5q5nKl6DM802dwI5w85b4JJ",
        "deletedAt": null
    }
]

const coursesData: Course[] = [
    {
        "id": "92d2defd-49e9-401e-ae14-6e10c986d3d1",
        "description": "Moderni Znackovaci Jazyky",
        "name": "PB138",
        "deletedAt": null
    },
    {
        "id": "a8b45ee3-f110-4265-a527-6fba4447d2c8",
        "description": "Algoritmy",
        "name": "IB001",
        "deletedAt": null
    },
    {
        "id": "49c1af40-35d9-48a4-9695-d7f164071f30",
        "description": "Matematika 1",
        "name": "MB144",
        "deletedAt": null
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
        "courseId": "92d2defd-49e9-401e-ae14-6e10c986d3d1",
        "semesterId": "42e0cd59-ae5b-46af-9fdb-aa0f642e1dc1",
        "deletedAt": null
    }
]


export default {
    usersData,
    semestersData,
    coursesData,
    courseSemesterData
};
