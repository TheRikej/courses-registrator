import * as React from 'react';
import SemesterItem from "../components/SemesterItem";
import {Button} from "@mui/material";
import {Link, Navigate} from "react-router-dom";
import formatSemester from "../utils/semester";
import { useQuery } from "@tanstack/react-query";
import { UserRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import NotAuthorized from "../components/NotAuthorized";

const Users = () => {
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }
    if (!loggedUser.admin) {
        return <NotAuthorized/>;
    }

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () => UserRequests.getUsers(),
    })

    console.log(users)

    if(users?.data === undefined) {
        return <></>
    }

    if (!users) return <>Loading...</>;

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-auto my-3 font-bold text-blue-950">
                Users
            </h1>
            <div className="rounded-lg border-solid border-2 mx-2">
                <ul className="overflow-y-scroll max-h-96">
                    {users.data.map(user =>
                    <li
                        className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5 lg:w-80"
                        key={user.email}
                    >
                        <Link to={"/users/" + user.id + "/show"} className="m-2">
                            {user.userName}, id {user.id} ({user.administrator ? "admin" : ""} {user.teacher ? " teacher" : ""}
                            {user.student ? " student" : ""})
                        </Link>
                    </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Users;
