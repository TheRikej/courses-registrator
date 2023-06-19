import { Button } from '@mui/material';
import React  from 'react';
import {Link, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseRequests } from '../services';

export default function DeleteCourse() {
    const { code } = useParams();

    const queryClient = useQueryClient();

    const { mutate: remove } = useMutation({
        mutationFn: (info: {
            id: string,
        }) => CourseRequests.deleteCourse( info.id ),
        onSuccess: () => {
            queryClient.invalidateQueries(['faculties']);
        },
    });

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
