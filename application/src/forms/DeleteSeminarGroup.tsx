import { Button } from '@mui/material';
import React, { useState }  from 'react';
import {Link, Navigate, useLocation, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SeminarRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import NotAuthorized from "../components/NotAuthorized";

export default function DeleteSeminarGroup() {
    const [success, setSuccess] = useState<boolean>(false);
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }
    if (!loggedUser.admin && !loggedUser.teacher) {
        return <NotAuthorized/>;
    }

    const { code, semester, group } = useParams();

    const queryClient = useQueryClient();

    const { state } = useLocation();

    const { mutate: remove } = useMutation({
        mutationFn: (info: {
            id: string,
        }) => {
            const result = SeminarRequests.deleteSeminar( info.id )
            setSuccess(true)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['seminarGroups']);
        },
    });

    if (success) {
        return <Navigate to={"/courses/" + code + "/" + semester + "/show"} state={{id: state.courseSemesterId, isEnrolled: state.isEnrolledSemester, isEnrolledSeminar: state.isEnrolledSeminar}}/>
    }

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"seminar group " + group + " of " + code?.toUpperCase()
                + " in " + semester?.toLowerCase()}/>
            <div className="flex flex-row items-center mx-auto">
                <Button color="success" className="w-24 lg:w-40" type="submit"
                        variant="outlined" sx={{ margin: '1rem 1rem' }}
                        onClick={() => remove({id: state.id})}
                >
                    Yes
                </Button>
                <Link to={"/courses/" + code + "/" + semester + "/seminars/" + group + "/show"} state={{id: state.id, isEnrolledSeminar: state.isEnrolledSeminar,
                            isEnrolledSemester: state.isEnrolledSemester, courseSemesterId: state.courseSemesterId}}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
