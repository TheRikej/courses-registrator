export interface UserModel {
    id: number,
    userName: string,
    email: string,
    createdAt: Date,
    teacher: boolean,
    student: boolean,
    administrator: boolean,
}

/*export interface MessageWithUser extends Msg{
    sender: { id: string, name: string, picture?: string },
}*/