import { atom } from "recoil";
import { UserModel } from "../services/models";

export interface LoggedUser {
    id: number,
    name: string,
    admin: boolean,
    teacher: boolean,
    student: boolean,
}

export const loggedUserAtom = atom<LoggedUser | null>({
    key: 'LoggedUser',
    default: null,
});


export const userAtom = atom<UserModel | null>({
    key: 'user',
    default: null,
});