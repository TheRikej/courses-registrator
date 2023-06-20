import { Button } from '@mui/material';
import React  from 'react';
import {Link, Navigate, useLocation, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SeminarRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import NotAuthorized from "../components/NotAuthorized";

export default function DeleteSeminarGroup() {
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
        }) => SeminarRequests.deleteSeminar( info.id ),
        onSuccess: () => {
            queryClient.invalidateQueries(['seminarGroups']);
        },
    });

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
                <Link to={"/courses/" + code + "/" + semester + "/seminars/" + group + "/show"} state={{id: state.id}}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
