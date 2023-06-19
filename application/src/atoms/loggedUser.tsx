import { atom } from "recoil";

export interface LoggedUser {
    id: number,
    name: string,
    admin: boolean,
    teacher: boolean,
    student: boolean,
}

export const loggedUserAtom = atom<LoggedUser | null>({
    key: 'LoggedUser',
    default: {id: 1, admin: true, teacher: false, student: true, name: "Jakub Judiny"},
});
