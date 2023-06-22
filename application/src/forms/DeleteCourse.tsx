import { Button } from '@mui/material';
import React, { useState }  from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseRequests } from '../services';
import NotAuthorized from "../components/NotAuthorized";
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";

export default function DeleteCourse() {
    const [success, setSuccess] = useState<boolean>(false);
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }
    if (!loggedUser.admin && !loggedUser.teacher) {
        return <NotAuthorized/>;
    }

    const { code } = useParams();

    const queryClient = useQueryClient();

    const { mutate: remove } = useMutation({
        mutationFn: (info: {
            id: string,
        }) => {
            const courseResult = CourseRequests.deleteCourse( info.id );
            setSuccess(true)
            return courseResult
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['faculties']);
        },
    });

    if (success) {
        return <Navigate to={"/courses"}/>
    }

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"course " + code?.toUpperCase()}/>
            <div className="flex flex-row items-center mx-auto">
                <Button color="success" className="w-24 lg:w-40" type="submit"
                        variant="outlined" sx={{ margin: '1rem 1rem' }}
                        onClick={() => remove({id: code !== undefined ? code : ""})}
                >
                    Yes
                </Button>
                <Link to={"/courses/" + code + "/show"}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
