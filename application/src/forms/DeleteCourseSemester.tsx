import { Button } from '@mui/material';
import React  from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import Warning from "../components/Warning";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseSemesterRequests } from '../services';

export default function DeleteCourseSemester() {
    const { code, semester } = useParams();

    const { state } = useLocation();

    const queryClient = useQueryClient();

    const { mutate: remove } = useMutation({
        mutationFn: (info: {
            id: string,
        }) => CourseSemesterRequests.deleteCourse( info.id ),
        onSuccess: () => {
            queryClient.invalidateQueries(['courseSemesters', 'HomepageCourseSemesters']);
        },
    });

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
                <Link to={"/courses/" + code + "/" + semester + "/show"}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
