import * as React from 'react';
import {Button} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserRequests } from '../services';

const User = () => {

    const queryClient = useQueryClient();

    const { id } = useParams();

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => UserRequests.getUser(id !== undefined ? id : "0"),
    })

    const { mutate: changeStatus } = useMutation({
        mutationFn: (info: {
            id: number,
            student: boolean, 
            teacher: boolean,
            administrator: boolean,
        }) => UserRequests.changeStudentStatus(
            info.id, info.teacher, info.student, info.administrator
        ),
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        },
    });

    if(user?.data === undefined || user.data.createdAt === undefined) {
        return <></>
    }

    if (!user) return <>Loading...</>;

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                User {user.data.userName}
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-2 max-w-2xl gap-1 p-4">
                <p><b>Id</b>: {user.data.id}</p>
                <p><b>Email</b>: {user.data.email}</p>
                <p><b>Created at</b>: {new Date(user.data.createdAt).toDateString()}</p>
                <p><b>Roles</b>: {user.data.administrator ? "admin" : ""}
                    {user.data.teacher ? " teacher" : ""}
                    {user.data.student ? " student" : ""}
                </p>
                <div className="admin-only">
                    <div className="flex flex-col lg:flex-row justify-center block mx-auto mt-2">
                        <Button color={user.data.student ? "error" : "info"} onClick={() => changeStatus({
                            administrator: user.data.administrator,
                            student: !user.data.student,
                            teacher: user.data.teacher,
                            id: user.data.id,
                        })}
                                type="button" variant="outlined" sx={{ margin: '0.5rem 0.25rem' }}>
                            {user.data.student ? "Remove as student" : "Add as student"}
                        </Button>
                        <Button color={user.data.teacher ? "error" : "info"} onClick={() => changeStatus({
                            administrator: user.data.administrator,
                            student: user.data.student,
                            teacher: !user.data.teacher,
                            id: user.data.id,
                        })}
                                type="button" variant="outlined" sx={{ margin: '0.5rem 0.25rem' }}>
                            {user.data.teacher ? "Remove as teacher" : "Add as teacher"}
                        </Button>
                        <Button color={user.data.administrator ? "error" : "info"} onClick={() => changeStatus({
                            administrator: !user.data.administrator,
                            student: user.data.student,
                            teacher: user.data.teacher,
                            id: user.data.id,
                        })}
                                type="button" variant="outlined" sx={{ margin: '0.5rem 0.25rem' }}>
                            {user.data.administrator ? "Remove as admin" : "Add as admin"}
                        </Button>
                        <Link to={"/users/" + user.data.id + "/delete"} className="mx-auto">
                            <Button color="error" type="button" variant="outlined" sx={{ margin: '0.5rem 0.25rem' }}>
                                Delete user
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="block mx-auto admin-only">
                <Link to={"/users/"}>
                    <Button type="button" variant="outlined" sx={{ margin: '1.5rem 2rem 1rem' }}>
                        Back to users
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default User;
