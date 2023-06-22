import { Button } from '@mui/material';
import React, { useState }  from 'react';
import {Link, Navigate, useLocation, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseSemesterRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import NotAuthorized from "../components/NotAuthorized";

export default function DeleteCourseSemester() {
    const [success, setSuccess] = useState<boolean>(false);
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }
    if (!loggedUser.admin && !loggedUser.teacher) {
        return <NotAuthorized/>;
    }

    const { code, semester } = useParams();

    const { state } = useLocation();

    const queryClient = useQueryClient();

    const { mutate: remove } = useMutation({
        mutationFn: (info: {
            id: string,
        }) => {
            const courseSemResult = CourseSemesterRequests.deleteCourse( info.id );
            setSuccess(true);
            return courseSemResult;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courseSemesters', 'HomepageCourseSemesters']);
        },
    });

    if (success) {
        return <Navigate to={"/courses"}/>
    }

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"course " + code?.toUpperCase() + " in " + semester?.toLowerCase()}/>
            <div className="flex flex-row items-center mx-auto">
                <Link to={"/courses"}>
                    <Button color="success" className="w-24 lg:w-40" type="submit"
                            variant="outlined" sx={{ margin: '1rem 1rem' }}
                            onClick={() => remove({id: state.id})}
                    >
                        Yes
                    </Button>
                </Link>
                <Link to={"/courses/" + code + "/" + semester + "/show"} state={{id: state.id, isEnrolled: state.isEnrolled}}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
