import { Button } from '@mui/material';
import React  from 'react';
import {Link, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserRequests } from '../services';

export default function DeleteUser() {
    const { id } = useParams();

    const fullId = id !== undefined ? id : "0";

    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ['userName'],
        queryFn: () => UserRequests.getUser(id !== undefined ? id : "0"),
    })

    const { mutate: changeStatus } = useMutation({
        mutationFn: (info: { id: string }) => UserRequests.deleteUser(
            info.id
        ),
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"user " + user?.data.userName + " (id: " + id + ")"}/>
            <div className="flex flex-row items-center mx-auto">
                <Link to={"/users"}>
                <Button color="success" className="w-24 lg:w-40" type="submit"
                        variant="outlined" sx={{ margin: '1rem 1rem' }}
                        onClick={() => changeStatus({id: fullId})}
                >
                    Yes
                </Button>
                </Link>
                <Link to={"/users/" + id + "/show"}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
