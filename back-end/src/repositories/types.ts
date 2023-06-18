import type { Result } from '@badrap/result';

export type AsyncResult<T> = Promise<Result<T>>;

export interface LoggedInUser {
    id: number, 
    admin: boolean, 
    teacher: boolean, 
    student: boolean,
}