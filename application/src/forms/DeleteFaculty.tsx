import { Button } from '@mui/material';
import React  from 'react';
import {Link, Navigate, useLocation, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FacultyRequests } from '../services';
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import NotAuthorized from "../components/NotAuthorized";

export default function DeleteFaculty() {
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }
    if (!loggedUser.admin) {
        return <NotAuthorized/>;
    }

    const { faculty } = useParams();

    const { state } = useLocation();

    const queryClient = useQueryClient();

    const { mutate: remove } = useMutation({
        mutationFn: (info: {
            id: string,
        }) => FacultyRequests.deleteFaculty( info.id ),
        onSuccess: () => {
            queryClient.invalidateQueries(['faculties']);
        },
    });

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"faculty " + faculty}/>
            <div className="flex flex-row items-center mx-auto">
                <Button color="success" className="w-24 lg:w-40" type="submit"
                        variant="outlined" sx={{ margin: '1rem 1rem' }}
                        onClick={() => remove({id: state.id})}
                >
                    Yes
                </Button>
                <Link to="/faculties/">
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
