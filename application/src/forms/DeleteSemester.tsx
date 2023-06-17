import { Button } from '@mui/material';
import React  from 'react';
import {Link, useParams} from 'react-router-dom';
import Warning from "../components/Warning";

export default function DeleteSemester() {
    const { semester } = useParams();

    const remove = () => {
        //TODO: delete semester
        // and then redirect to /semesters/
    }

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"semester " + semester}/>
            <div className="flex flex-row items-center mx-auto">
                <Button color="success" className="w-24 lg:w-40" type="submit"
                        variant="outlined" sx={{ margin: '1rem 1rem' }}
                        onClick={remove}
                >
                    Yes
                </Button>
                <Link to="/semesters/">
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
