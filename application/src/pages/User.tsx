import * as React from 'react';
import {Button} from "@mui/material";
import {Link, useParams} from "react-router-dom";

const User = () => {
    const { id } = useParams();

    //TODO: fetch user API
    const user = {
        id: 45,
        userName: "xjudiny",
        email: "judiny@courseregistrator.cz",
        createdAt: new Date(),
        teacher: true,
        student: false,
        administrator: true,
    };

    const changeStudentStatus = () => {
        //TODO: change student status
    };

    const changeTeacherStatus = () => {
        //TODO: change teacher status
    };

    const changeAdminStatus = () => {
        //TODO: change admin status
    };

    return (
        <div className="flex flex-col flex-start m-2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                User {user.userName}
            </h1>
            <div className="flex flex-col rounded-lg border-solid border-2 mx-2 max-w-2xl gap-1 p-4">
                <p><b>Id</b>: {user.id}</p>
                <p><b>Email</b>: {user.email}</p>
                <p><b>Created at</b>: {user.createdAt.toDateString()}</p>
                <p><b>Roles</b>: {user.administrator ? "admin" : ""}
                    {user.teacher ? " teacher" : ""}
                    {user.student ? " student" : ""}
                </p>
                <div className="admin-only">
                    <div className="flex flex-col lg:flex-row justify-center block mx-auto mt-2">
                        <Button color={user.student ? "error" : "info"} onClick={changeStudentStatus}
                                type="button" variant="outlined" sx={{ margin: '0.5rem 0.25rem' }}>
                            {user.student ? "Remove as student" : "Add as student"}
                        </Button>
                        <Button color={user.teacher ? "error" : "info"} onClick={changeTeacherStatus}
                                type="button" variant="outlined" sx={{ margin: '0.5rem 0.25rem' }}>
                            {user.teacher ? "Remove as teacher" : "Add as teacher"}
                        </Button>
                        <Button color={user.administrator ? "error" : "info"} onClick={changeAdminStatus}
                                type="button" variant="outlined" sx={{ margin: '0.5rem 0.25rem' }}>
                            {user.administrator ? "Remove as admin" : "Add as admin"}
                        </Button>
                        <Link to={"/users/" + user.id + "/delete"} className="mx-auto">
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
