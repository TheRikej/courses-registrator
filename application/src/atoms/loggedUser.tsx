import { atom } from "recoil";

export interface LoggedUser {
    id: number,
    admin: boolean,
    teacher: boolean,
    student: boolean,
}

export const loggedUserAtom = atom<LoggedUser | null>({
    key: 'TodoList',
    default: null,
});
